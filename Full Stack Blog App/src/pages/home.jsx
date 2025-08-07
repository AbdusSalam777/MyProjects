import Navbar from "../components/navbar";
import PopularCategories from "../components/popularcategories.jsx"
import Postlists from "../components/Postlists.jsx";
import Newposts from "../components/Newposts.jsx";
import { useNavigate  } from "react-router-dom";
import Postlistsnew from "../components/postlistsnew.jsx";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar/>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 mt-2 md:mt-3">
          <a className="text-sm md:text-lg" href="/">
            Home
          </a>
          <span> • </span>
          <span className="text-blue-500 text-sm md:text-lg">
            Blogs and Articles
          </span>
        </div>

        <div className="flex">
          <div className="w-[900px]">
            <p className="font-bold text-2xl md:text-5xl lg:text-6xl text-gray-800 ">
              Unpacking Code, One Post at a Time
            </p>
            <p className="text-md md:text-xl text-gray-800 mt-2 md:mt-4 ">
              Write your story • Share your idea • Build your future
            </p>
          </div>

          <div className="relative w-[200px] h-[200px]">
            <svg
              viewBox="0 0 200 200"
              width="200"
              height="200"
              className="animate-spin-slow" // 👈 custom animation
            >
              <path
                id="circlePath"
                fill="none"
                d="M 100, 100 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
              />
              <text fill="black">
                <textPath href="#circlePath" startOffset="0%">
                  Write your story •
                </textPath>
                <textPath href="#circlePath" startOffset="50%">
                  Share your idea •
                </textPath>
              </text>
            </svg>

            <button 
            onClick={()=>
              {navigate("/write")}
            }
            className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
              </svg>
            </button>
          </div>
        </div>
        < PopularCategories/>
        <Postlistsnew/>
        <Postlists/>
      </div>
    </>
  );
}
export default Home;
