import { AuthView } from "@clerk/expo/native";

const Login = () => {
  return <AuthView mode="signIn" isDismissible={false} />;
};

export default Login;
