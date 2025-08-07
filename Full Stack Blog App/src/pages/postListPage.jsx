import Navbar from "../components/navbar";
import Postlists from "../components/Postlists";
import Sidemenu from "../components/Sidemenu";
function Listpage(){

    return(<>
    <Navbar/>
    <div>

      <div>
        <Postlists/>
      </div>

      <div>
        <Sidemenu/>
      </div>

    </div>
    </>);


}
export default Listpage;