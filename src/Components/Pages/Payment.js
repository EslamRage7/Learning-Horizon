import React, { useEffect, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const PaymobPayment = () => {
  const [orderId, setOrderId] = useState(null);
  const [paymentKey, setPaymentKey] = useState(null);
  const [token, setToken] = useState(null);
  const [price, setPrice] = useState(0);
  const apiKey =
    "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RrNE1UWTFMQ0p1WVcxbElqb2lNVGN5TnpVMk1EYzBPQzQwTmpJNU1UVWlmUS5NNk10d1FBS1g5M1VSRVFVUE82NlFQQ2gzZkdxVHpKdVJaeWNWZXBUNy1mbVM2VTBNaWV1b2ZWX0s5RWp2eTBOM2RNVnZZSnljRHJDWWZTb0VKMngyUQ==";
  const secretKey = "e#J8zL5$e2f!v9@k8U%tR6^wO4z&Q3m*J9bL$7yP8";

  const decryptData = (key) => {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      console.log(`${key}:`, decryptedData);
      return decryptedData;
    }
    return null;
  };

  const firstName = decryptData("firstNameKey");
  const lastName = decryptData("lastNameKey");
  const userName = decryptData("userNameKey");
  const country = decryptData("countryKey");
  const city = decryptData("cityKey");

  const firstStep = async () => {
    let data = {
      api_key: apiKey,
    };

    const request = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let response = await request.json();
    if (response.token) {
      setToken(response.token);
    } else {
      console.error("Error fetching token:", response);
    }
  };

  const createOrder = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        "https://accept.paymob.com/api/ecommerce/orders",
        {
          auth_token: token,
          amount_cents: price * 100,
          currency: "EGP",
          payment_method_id: 1,
          items: [
            {
              name: "منتج تجريبي",
              amount_cents: price,
              description: "وصف المنتج",
              quantity: 1,
            },
          ],
          billing_data: {
            apartment: "1",
            email: userName,
            floor: "2",
            first_name: firstName,
            last_name: lastName,
            country: country,
            city: city,
            state: city,
            street: "شارع النيل",
            building: "123",
            phone_number: "+201007712100",
            postal_code: "12345",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderId(response.data.id);
      createPaymentKey(response.data.id);
    } catch (error) {
      console.error(
        "Error creating payment key:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const createPaymentKey = async (orderId) => {
    try {
      const response = await axios.post(
        "https://accept.paymob.com/api/acceptance/payment_keys",
        {
          auth_token: token,
          amount_cents: price * 100,
          order_id: orderId,
          currency: "EGP",
          integration_id: "4842892",
          billing_data: {
            first_name: firstName,
            last_name: lastName,
            email: userName,
            country: country,
            city: city,
            state: city,
            apartment: "1",
            street: "شارع النيل",
            floor: "2",
            building: "123",
            postal_code: "12345",
            phone_number: "+201007712100",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPaymentKey(response.data.token);
    } catch (error) {
      console.error(
        "Error creating payment key:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePayment = () => {
    if (paymentKey) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://accept.paymob.com/api/acceptance/iframes/871588?payment_token=${paymentKey}`;
      iframe.style.width = "100%";
      iframe.style.height = "720px";
      document.body.appendChild(iframe);
    }
  };

  useEffect(() => {
    const storedPrice = decryptData("CoursePrice");
    if (storedPrice) {
      setPrice(Number(storedPrice));
    }
    firstStep();
  }, []);

  useEffect(() => {
    if (token) {
      createOrder();
    }
  }, [token]);

  useEffect(() => {
    if (paymentKey) {
      handlePayment();
    }
  }, [paymentKey]);
};

export default PaymobPayment;
