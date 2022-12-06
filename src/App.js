import {Component} from "react"
import UserCard from './components/UserCard'
import ReactPaginate from "react-paginate";
import './App.css'

class App extends Component {
  state = {
    usersList: [],
    searchInput: '',
    currentPage: 1,
    usersPerPage: 10,
    isActiveTab: '',
    isAllSelected: false,
  }

  componentDidMount() {
    this.getProductsData();
  }

  getProductsData = async () => {
    const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    const data = await response.json();
    const updatedData = data.map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      role: item.role,
      isChecked: false
    }))
    this.setState({usersList: updatedData})
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteUser = userId => {
    const {usersList} = this.state
    const filteredUserList = usersList.filter(item => item.id !== userId)
    this.setState({usersList: filteredUserList})
  }

  selectedUsers = userId => {
    this.setState(prevState => ({usersList: prevState.usersList.map(item => {
      if (userId === item.id) {
        return {...item, isChecked: !item.isChecked}
      }
      return item
    })}))
  }

  /** selectAllUsers = () => {
    const {usersPerPage, currentPage} = this.state
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;
    console.log(indexOfFirstPost)
    console.log(indexOfLastPost)
    this.setState(prevState => ({
      isAllSelected: !prevState.isAllSelected,
      usersList: prevState.usersList.slice(indexOfFirstPost, indexOfLastPost).map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
        isChecked: true
      }))
    }))
  } **/

  onDeleteSelected = () => {
    const {usersList} = this.state;
    const filteredList = usersList.filter(item => item.isChecked !== true)
    this.setState({usersList: filteredList})
  }

  changePage = ({ selected }) => {
    this.setState({currentPage: selected});
  };

  render() {
    const {usersList, searchInput, usersPerPage, currentPage, isAllSelected} = this.state
    const pagesVisited = currentPage * usersPerPage;
    const pageCount = Math.ceil(usersList.length / usersPerPage);

    const searchResults = usersList.slice(pagesVisited, pagesVisited + usersPerPage).filter(item => item.name.toLowerCase().includes(searchInput) || item.email.toLowerCase().includes(searchInput) ||  item.role.toLowerCase().includes(searchInput))
    return (
      <div className="main-container">
        <div className="user-list-container">
          <div className="search-bar">
            <input type="text" placeholder="Search by name, email or role" className="search-input" onChange={this.onSearch} value={searchInput} />
          </div>
          <div className="d-flex justify-content-between">
            <input type="checkbox" className="checkbox" />
            <h1 className="userlist-heading">Name</h1>
            <h1 className="userlist-heading">Email</h1>
            <h1 className="userlist-heading">Role</h1>
            <h1 className="userlist-heading">Actions</h1>
          </div>
          <div>
            {searchResults.map(item => <UserCard eachUser={item} key={item.id} deleteUser={this.deleteUser} selectedUsers={this.selectedUsers} isAllSelected={isAllSelected} />)}
          </div>
          <div className="d-flex justify-content-around mt-3">
            <button type="button" className="delete-button" onClick={this.onDeleteSelected}>Delete Selected</button>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={this.changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default App;
