function Lognav(){
    return( <nav className="mt-5">
      <div className=" flex justify-between">
        <div className="">
          <img
            onClick={() => {
              navigate("/");
            }}
            className="h-[50px] brightness-125 ml-5"
            src="/logo.png"
          ></img>
        </div>

        <div>
          
        </div>
      </div>
    </nav>);
}
export default Lognav;