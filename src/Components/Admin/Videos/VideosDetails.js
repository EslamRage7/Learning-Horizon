import "../css/view.css";
import "video-react/dist/video-react.css";
import {
  Player,
  ForwardControl,
  ControlBar,
  ReplayControl,
  PlaybackRateMenuButton,
} from "video-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function VideosDetails() {
  let { lessonsID } = useParams();

  const [lesson, setLesson] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const api_url_lesson = `https://learning-horizon-server.premiumasp.net/Api/Lesson/GetLessonById?id=${lessonsID}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(api_url_lesson);
        const data = await res.json();
        setLesson(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lessonsID]);

  const lesson_path = lesson.lessonPath
    ? `https://learning-horizon-server.premiumasp.net/Api/Lesson/GetLessonFile?path=${lesson.lessonPath}`
    : "";

  return (
    <div className="details">
      <div className="container">
        <h1 className="head mt-5 mb-5">Lesson Details</h1>
        <div className="row text-center">
          <div className="col-12">
            <div className="element text-center">
              {isLoading ? (
                <div>Loading...</div>
              ) : lesson ? (
                <div className="box text-center p-4 mb-3">
                  <div className="mb-3 video-container">
                    {lesson_path && (
                      <Player
                        playsInline
                        src={lesson_path}
                        className="video-player"
                      >
                        <ControlBar autoHide={true}>
                          <ForwardControl seconds={10} order={3.1} />
                          <ReplayControl seconds={10} order={2.1} />
                          <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} />
                        </ControlBar>
                      </Player>
                    )}
                  </div>
                  <div className="mb-1">
                    <span className="span-head">Lesson Title:</span>
                    <span className="span-body text-black-50">
                      {lesson.lessonTittle || "Not Available"}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="span-head">Course Title:</span>
                    <span className="span-body text-black-50">
                      {lesson.courseTittle || "Not Available"}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="span-head">Lesson Order:</span>
                    <span className="span-body text-black-50">
                      {lesson.lessonOrderInCourse || "Not Available"}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="span-head">Type:</span>
                    <span className="span-body text-black-50">
                      {lesson.lessonIsFree ? "Free" : "Premium"}
                    </span>
                  </div>
                  <Link className="text-start btn mt-4" to="/admin/lessons">
                    Back to Admin Page
                  </Link>
                </div>
              ) : (
                <div className="text-center">No lesson data available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideosDetails;
