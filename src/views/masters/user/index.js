import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Modal from './modal';
import Alert from 'sweetalert2';
import { connect } from "react-redux";
import {createUser} from './service';
import { Header, SideNavBar } from 'components';

const headers =['AdminId','firstName','lastName','EmailId','Password','Gender','Dob','Department','Address','City','scheduleid','Phonenumber'];  
const searchItem = headers.slice(0, -1)

 class UserPage extends Component {
  state = {
    modal :false,
    edit:{}
  }
  modalOpen = () => {
    this.setState({modal: true})
  }
  modalClose =() => {
    this.setState({modal:false , edit:{}})
  }
  editData = data => {
    //this.setState({modal:true , edit:data})
  }


  deleteData = e => {
    e.preventDefault();
    // Alert.fire({
    //   title: 'Are you sure?',
    //   text: 'You will not be able to recover this imaginary file!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    //     Alert.fire(
    //       'Deleted!',
    //       'Your imaginary file has been deleted.',
    //       'success'
    //     )
    //   // For more information about handling dismissals please visit
    //   // https://sweetalert2.github.io/#handling-dismissals
    //   } else if (result.dismiss === Alert.DismissReason.cancel) {
    //     Alert.fire(
    //       'Cancelled',
    //       'Your imaginary file is safe :)',
    //       'error'
    //     )
    //   }
    // })
  }
  submit = data => {
    this.props.submit(data)
  }
  render() {
    const { modal,edit } = this.state;
    return (
      <div className='wrapper'>
      <SideNavBar/>
      <div className="main">
       <Header/>
      <main className="content">
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">User Lists</h1>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-6  text-left">
                      {/* <div id="datatables-basic_filter" className="dataTables_filter">
                        <label>Search:
                        <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="datatables-basic" />
                        </label>
                      </div> */}
                    </div>
                    <div className="col-6 text-right">
                      <div id="datatables-basic_filter" className="dataTables_filter">
                        <button className="btn btn-primary" data-toggle="modal" onClick={()=>this.modalOpen()} data-target="#sizedModalLg">New User</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <table id="datatables-buttons" className="table table-striped" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        {
                          headers.map((item,keys) => <th key={keys}>{item}</th>)
                        }
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* <td>Tiger Nixon</td>
                        <td>System Architect</td>
                        <td>Edinburgh</td>
                        <td>61</td>
                        <td>2011/04/25</td> */}
                        <td className="table-action">
                          <Link to={"#"} onClick={()=>this.editData({name:'test'})} style={{marginRight:10}}><i className="fa fa-pencil align-middle" aria-hidden="true"></i></Link>
                          <Link to={"#"} onClick={this.deleteData}><i className="fa fa-trash-o align-middle" aria-hidden="true"></i></Link>
											  </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Modal modalOpen={modal} modalClose={this.modalClose} edit={edit}/>
        </div>
      </main>
      </div>
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//       brandList: state.master.brandList !== undefined ?  state.master.brandList: []
//   }
// }
const mapDispatchToProps = (dispatch) => {
    return {
        //getBrandList: () => dispatch(getBrandList()),
        submit: (data) => dispatch(createUser(data)),
    }
}
export default connect (null, mapDispatchToProps)(UserPage)