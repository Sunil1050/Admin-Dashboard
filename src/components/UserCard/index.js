import {useState} from "react"
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {FiEdit} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'
import {IoIosCloseCircle} from 'react-icons/io'
import './index.css'
const UserCard = props => {
    const {eachUser, deleteUser, selectedUsers, isAllSelected} = props
    const {id, name, email, role} = eachUser;
    const [userName, setUserName] = useState(name)
    const [userMail, setUserMail] = useState(email)
    const [userRole, setUserRole] = useState(role)
    /**Logic to delete a specific user from group of users based on the Id provided **/

    const onDelete = () => {
        deleteUser(id)
    }

    const onClickCheckbox = () => {
        selectedUsers(id)
    }

    const onChangeName = event => {
        setUserName(event.target.value)
    }

    const onChangeMail = event => {
        setUserMail(event.target.value)
    }

    const onChangeRole = event => {
        setUserRole(event.target.value)
    }


    const overlayStyles = {
        backgroundColor: 'transparent',
    }

    return (
        <div className="user-card">
            <input type="checkbox" className="checkbox-items" onClick={onClickCheckbox} />
            <h1 className="userlist-desc name-alignment">{userName}</h1>
            <h1 className="userlist-desc ml-5 mr-5">{userMail}</h1>
            <h1 className="userlist-desc ml-5 mr-5">{userRole}</h1>
            <div className="d-flex">
                <div>
                    <Popup
                        trigger={
                        <button type="button" className="action-button">
                            <FiEdit className="action-icon" />
                        </button>
                        }
                        overlayStyle={overlayStyles}
                    >
                        {close => (
                            <div className="popup-container">
                                <div className="d-flex justify-content-end">
                                    <button type="button" onClick={() => close()} className="edit-btn">
                                        <IoIosCloseCircle className="edit-close" />
                                    </button>
                                </div>
                                <div className="mb-3">
                                    <label for="name" className="edit-label">Name:</label>
                                    <br />
                                    <input type="text" id="name" onChange={onChangeName} value={userName} />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="edit-label">E-mail:</label>
                                    <br />
                                    <input type="text" id="email" onChange={onChangeMail} value={userMail} />
                                </div>
                                <div className="mb-3">
                                    <label for="role" className="edit-label">Role:</label>
                                    <br />
                                    <input type="text" id="role" onChange={onChangeRole} value={userRole} />
                                </div>
                                </div>
                        )}
                    </Popup>
                </div>
                <button type="button" className="action-button" onClick={onDelete}>
                    <MdDelete className="action-icon" color="#ff0000" />
                </button>
            </div>
          </div>
    )
}
export default UserCard;
