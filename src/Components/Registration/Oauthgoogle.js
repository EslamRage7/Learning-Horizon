// // import React, { useState, useEffect } from "react";
// // import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// // import axios from "axios";

// // const clientId =
// //   "923325717406-q2f9h3pgnsiarbei8s5e1ph2t36p9b36.apps.googleusercontent.com";

// // function Oauthgoogle() {
// //   const [user, setUser] = useState(null);
// //   const [profile, setProfile] = useState(null);

// //   const login = useGoogleLogin({
// //     onSuccess: (response) => {
// //       setUser(response);
// //     },
// //     onError: (error) => console.log("Login Failed:", error),
// //   });

// //   useEffect(() => {
// //     if (user && user.access_token) {
// //       axios
// //         .get(
// //           `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.access_token}`, // استخدام v3 بدلاً من v1
// //           {
// //             headers: {
// //               Authorization: `Bearer ${user.access_token}`,
// //               Accept: "application/json",
// //             },
// //           }
// //         )
// //         .then((res) => {
// //           setProfile(res.data);
// //         })
// //         .catch((err) => console.log(err));
// //     }
// //   }, [user]);

// //   const logOut = () => {
// //     googleLogout();
// //     setProfile(null);
// //   };

// //   return (
// //     <div>
// //       <h2>React Google Login</h2>
// //       <br />
// //       <br />
// //       {profile ? (
// //         <div>
// //           <img src={profile.picture} alt="user image" />
// //           <h3>User Logged in</h3>
// //           <p>Name: {profile.name}</p>
// //           <p>Email Address: {profile.email}</p>
// //           <br />
// //           <br />
// //           <button onClick={logOut}>Log out</button>
// //         </div>
// //       ) : (
// //         <button onClick={login}>Sign in with Google 🚀 </button>
// //       )}
// //     </div>
// //   );
// // }

// // export default Oauthgoogle;

// import React, { useEffect } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import { notifications } from "@mantine/notifications";
// import { useSocialSignUpMutation } from "../../../store/api/Login/AuthApi";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../../../store/api/Auth/AuthSlice";
// import { useNavigate, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";

// const Oauthgoogle = ({ image, setName, setEmail }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { from } = location.state || { from: { pathname: "/home" } };
//   const [socialSignUp, { data: userData, isLoading, isError, isSuccess }] =
//     useSocialSignUpMutation();
//   const handleLoginSuccess = async (response) => {
//     const authorizationCode = response.access_token;

//     try {
//       await socialSignUp({
//         access_provider_token: authorizationCode,
//         provider: "google",
//       }).unwrap();
//       localStorage.setItem("social", "google");
//       localStorage.setItem("socailAccessToken", authorizationCode);
//     } catch (error) {}
//   };

//   const handleLoginFailure = (error) => {
//     notifications?.show({
//       title: "Login Failed",
//       color: "red",
//       message: error,
//     });
//   };

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => handleLoginSuccess(codeResponse),
//     onError: (error) => handleLoginFailure(error),
//   });

//   useEffect(() => {
//     if (isSuccess && userData) {
//       if (userData?.access_token && userData?.refresh_token) {
//         dispatch(
//           setCredentials({
//             user: userData?.user,
//             access_token: userData?.access_token,
//             refresh_token: userData?.refresh_token,
//           })
//         );
//         Cookies.set("user", JSON.stringify(userData?.user), { expires: 1 });
//         Cookies.set("access_token", userData.access_token, { expires: 1 });
//         Cookies.set("refresh_token", userData.refresh_token);
//         localStorage.removeItem("social");
//         navigate(from.pathname, { replace: true });
//       } else {
//         if (setName && setEmail) {
//           setName(`${userData?.user?.first_name} ${userData?.user?.last_name}`);
//           setEmail(userData?.user?.email);
//         } else {
//           return;
//         }
//       }
//     }
//   }, [isSuccess, userData]);

//   return (
//     <img
//       src={image}
//       alt=""
//       className="w-10 h-10 lg:w-16 lg:h-16"
//       onClick={() => login()}
//       width="64px"
//       height="64px"
//     />
//   );
// };
// export default Oauthgoogle;
