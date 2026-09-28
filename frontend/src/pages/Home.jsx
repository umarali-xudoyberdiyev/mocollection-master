import { useEffect } from "react";
import { useNavigate } from "react-router";
import { SignInButton, SignUpButton } from "@clerk/react";
import { useAuth } from "@clerk/react";
import hero from "../img/hero.png";

function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/dashboard");
    }
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
      <div className="text-7xl mb-6">
        <img src={hero} alt="" className="w-[350px]" />
      </div>
      <h1 className="font-heading text-5xl text-matn mb-4">
        Dunyodagi <span className="text-yaponiya-quyosh">davlatlar</span>
      </h1>
      <p className="text-lg text-ikkilamchi max-w-xl mb-8">
        <span className="text-ozbekiston-feruza">Dunyo va davlatlar</span>{" "}
        haqida ko'proq malumotlar madaniyatilar haqida ko'proq bilmoqchi
        bo'lsangiz ro'yhatdan o'ting
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <SignUpButton mode="modal">
          <button className="bg-rossiya-chuqur text-turkiya-oq px-6 py-3 rounded-lg hover:opacity-90 transition font-medium">
            Boshlash
          </button>
        </SignUpButton>
        <SignInButton mode="modal">
          <button className="border border-ikkilamchi text-matn px-6 py-3 rounded-lg hover:bg-ertalabki-tuman transition font-medium">
            Hisobim bor
          </button>
        </SignInButton>
      </div>
    </div>
  );
}

export default Home;
