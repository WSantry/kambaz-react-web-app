import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router";
import { FormControl }   from "react-bootstrap";
import { FaUserCircle }  from "react-icons/fa";
import { FaPencil,FaCheck } from "react-icons/fa6";
import { IoCloseSharp }  from "react-icons/io5";
import * as client       from "../../Account/client";

export default function PeopleDetails(){
  const { uid } = useParams();
  const navigate = useNavigate();
  const [user,setUser]   = useState<any>(null);
  const [name,setName]   = useState("");
  const [editing,setEdit]= useState(false);

  useEffect(()=>{
    (async()=>{
      if(!uid) return;
      const u = await client.findUserById(uid);
      setUser(u); setName(`${u.firstName} ${u.lastName}`);
    })();
  },[uid]);

  if(!uid || !user) return null;

  const save = async ()=>{
    const [firstName,...rest] = name.split(" ");
    const lastName = rest.join(" ");
    const updated = await client.updateUser({ ...user,firstName,lastName });
    setUser(updated); setEdit(false); navigate(-1);
  };

  const remove = async ()=>{ await client.deleteUser(uid); navigate(-1); };

  return (
    <div className="position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25"
         style={{zIndex:1000}}>
      <button onClick={()=>navigate(-1)}
              className="btn position-absolute end-0 top-0">
        <IoCloseSharp className="fs-1"/>
      </button>

      <div className="text-center mt-4">
        <FaUserCircle className="text-secondary fs-1"/>
      </div><hr/>

      <div className="text-danger fs-4">
        {!editing &&
          <FaPencil className="float-end fs-5 mt-2"
                    style={{cursor:"pointer"}} onClick={()=>setEdit(true)}/>}
        {editing &&
          <FaCheck className="float-end fs-5 mt-2 me-2"
                   style={{cursor:"pointer"}} onClick={save}/>}
        {!editing &&
          <div onClick={()=>setEdit(true)} style={{cursor:"pointer"}}>
            {user.firstName} {user.lastName}
          </div>}
        {editing &&
          <FormControl value={name} className="w-75"
            onChange={e=>setName(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter") save(); }}/>
        }
      </div><br/>

      <b>Role:</b> {user.role}<br/>
      <b>Login ID:</b> {user.loginId}<br/>
      <b>Section:</b> {user.section}<br/>
      <b>Total Activity:</b> {user.totalActivity}<br/>

      <hr/>
      <button className="btn btn-danger float-end" onClick={remove}>Delete</button>
      <button className="btn btn-secondary float-end me-2" onClick={()=>navigate(-1)}>Cancel</button>
    </div>
  );
}
