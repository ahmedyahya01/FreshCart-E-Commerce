import { BeatLoader, MoonLoader } from "react-spinners";

export default function Loader() {
  return (
    <>
      <div className="loaderHeight flex justify-center items-center flex-col gap-5">
        <MoonLoader color="#278727" />
      </div>
    </>
  );
}
