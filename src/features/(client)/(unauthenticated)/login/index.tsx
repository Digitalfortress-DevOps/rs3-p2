import FormLogin from "@/components/common/form-login";
import Metadata from "@/components/common/metadata";
import drone from "@/assets/images/drone.webp";
import map from "@/assets/images/map.png";

export const ClientLogin = () => {
  return (
    <>
      <Metadata title="Login" />
      <div className="grid h-screen w-full grid-cols-1 gap-2 bg-foreground md:grid-cols-2">
        <div className="relative flex w-full flex-col items-center justify-center px-4">
          <img
            src={map}
            alt="map"
            className="absolute top-9 w-1/2 md:top-[85px]"
          />
          <div className="absolute top-0 left-0 h-28 w-full bg-[#ef4c2b]/30 blur-[100px]" />
          <FormLogin onLogin={() => {}} className="min-w-80 md:w-[400px]" />
        </div>
        <div className="hidden h-screen w-full md:block">
          <img src={drone} alt="RS3" className="h-full w-full object-cover" />
        </div>
      </div>
    </>
  );
};
