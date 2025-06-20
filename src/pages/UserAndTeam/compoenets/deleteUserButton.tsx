import { PiTrashThin } from "react-icons/pi";
import UserAndTeamButtonComponent from "./userAndTeamsButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteUser, getUsers } from "@/store/actions";
import { toast } from "react-toastify";

const DeleteUserButton = (props:any) => {
    const {selectedRowsData} = props;
  const dispatch = useAppDispatch();
   const {orgIDRedux} = useAppSelector(store => store.profile)
  const handleDeleteUser = async() => {
    // const userArr = [14];

    const response = await dispatch(deleteUser({
      org_id: orgIDRedux,
      user_id: selectedRowsData
    }))


    if(response.payload?.message?.includes("Users deleted successfully.")){
      toast.success(response?.payload?.message);
      dispatch(getUsers({organization_id: orgIDRedux}));
    }
    else{
      toast.error("Something went wrong. Try Again.");
    }
    console.log("delete user response",response);


  }
  return (
    <>
      <UserAndTeamButtonComponent
        onClick={() => handleDeleteUser()}
        icon={<PiTrashThin size={20} />}
        text="Delete User"
        backgroundcolor={"#fff"}
        textcolor="#C847E8"
        borderColor="#C847E8"
      />
    </>
  );
};

export default DeleteUserButton;
