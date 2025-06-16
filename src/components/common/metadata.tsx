import { Helmet } from "react-helmet-async";

const Metadata = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title ? `${title} - RS3` : "RS3"}</title>
    </Helmet>
  );
};

export default Metadata;
