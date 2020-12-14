import React from 'react'

export default function Users() {
    return (
        <div className="col-3 chat" style={{ height: "100%", paddingRight: "0px", paddingLeft: "0px" }}>
            <div className="card mb-sm-3 mb-md-0 contacts_card" style={{ height: "100%" }}>
                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control search" placeholder="Search" name=""></input>
                </div>
                <div style={{ height: "100%" }}>
                    <ul id="contacts" className="contacts">
                    </ul>
                </div>
                <div className="card-footer"></div>
            </div>
        </div>
    )
}
