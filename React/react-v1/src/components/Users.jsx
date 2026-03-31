 
import './Users.css'
function Users(){
    const names=["vishnu","prasanna","ambika","raju"];
    return(
        <>
        {
            names.map((name,i) => (<p key={(i)}>{name}</p>))
        }
        
    
        </>
    )
}
export default Users