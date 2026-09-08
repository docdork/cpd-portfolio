import { AuthView } from "@clerk/expo/native";

const Signup = () => {
  return <AuthView mode="signUp" isDismissible={false} />;
};

export default Signup;
