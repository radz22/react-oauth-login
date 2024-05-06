import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface google {
  email: string;
  picture: string;
  given_name: string;
}
const App = () => {
  const [token, setToken] = useState<google | null>();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        setToken(res.data);
      } catch {
        console.log("errorr");
      }
    },
  });

  console.log(token?.picture);
  return (
    <div>
      <img src={token?.picture} />
      <button onClick={() => login()}>google</button>;
    </div>
  );
};

export default App;
