import FormLogin from "@/components/common/form-login";
import map from "@/assets/images/map.png";
import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "@/api/auth";

export const AdminLogin = () => {
  const mutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
    onError: () => {},
  });

  const handleLogin = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    mutation.mutate({ email, password });
  };
  return (
    <div className="relative background-login-admin flex h-full w-full flex-col items-center bg-foreground">
      <img src={map} alt="map" className="mt-8 w-[50%]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <FormLogin
          className="w-[400px]"
          onLogin={handleLogin}
          isLoading={mutation.isPending}
          errorMessage={
            mutation.isError ? "Incorrect username or password!" : ""
          }
        />
      </div>
    </div>
  );
};
