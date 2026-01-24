import Lognav from "./loginnav.jsx";
import LoginBody from "./login_sinup.jsx"

function Login({loginemail,setloginemail}){
    return(
        <>
          <Lognav/>
          <LoginBody loginemail={loginemail} setloginemail = {setloginemail}/>
        </>
    
)
}
export default Login;