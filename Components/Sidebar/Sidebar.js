import React from 'react'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="text-center">
                <div className="figure-menu shadow">
                    <figure><img src="img/user1.png" alt="" /></figure>
                </div>
                <h5 className="mb-1 ">Ammy Jahnson</h5>
                <p className="text-mute small">Sydney, Australia</p>
            </div>
            <br />
            <div className="row mx-0">
                <div className="col">
                    <div className="card mb-3 border-0 shadow-sm bg-template-light">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <p className="text-secondary small mb-0">Balance Available</p>
                                    <h6 className="text-dark my-0">$2585.00</h6>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-default button-rounded-36 shadow"><i
                                        className="material-icons">add</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5 className="subtitle text-uppercase"><span>Menu</span></h5>
                    <div className="list-group main-menu">
                        <a href="index.html" className="list-group-item list-group-item-action active">Store</a>
                        <a href="notification.html" className="list-group-item list-group-item-action">Notification <span
                            className="badge badge-dark text-white">2</span></a>
                        <a href="all-products.html" className="list-group-item list-group-item-action">All Products</a>
                        <a href="my-order.html" className="list-group-item list-group-item-action">My Order</a>
                        <a href="profile.html" className="list-group-item list-group-item-action">My Profile</a>
                        <a href="controls.html" className="list-group-item list-group-item-action">Pages Controls <span
                            className="badge badge-light ml-2">Check</span></a>
                        <a href="setting.html" className="list-group-item list-group-item-action">Settings</a>
                        <a href="login.html" className="list-group-item list-group-item-action mt-4">Logout</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar