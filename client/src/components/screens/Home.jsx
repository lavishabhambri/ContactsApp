import React, { Component } from 'react';
import MainImage from "./../../images/main.png";
import "./../../css/home.css";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Home extends Component {
  render() {
    return (
      <div className="container-fluid main-page" style={{ padding: "0px" }}>
        <div className="home-container">
          <div class="row align-items-center">
            <div className="text-content col-sm-12 col-md-6">
              <h1>Carry your<br /> <span style={{ color: "#F89A99" }}>Phone Pocket </span><br />Anytime, Anywhere </h1>
              <h4 style={{ color: "#595959" }}>Never loose your contacts again.</h4>
              <h4 style={{ color: "#595959" }}>Pocket Phone is here to save all your contacts at just one place.</h4>

            </div>

            <div className="image-content col-sm-12 col-md-6">
              <img src={MainImage} href="" alt="" />
            </div>
          </div>

          <div>
            <h1 className="features-heading">Features</h1>
            <div className="container">
              <div className="row">
                <div className="col-sm-4">
                  <div className="text-center features-item">
                    <div className="col-wrapper">
                      <div className="icon-border">
                        <i class="fa fa-address-book fa-3x color-l-purple"></i>
                      </div>
                      <h5>Maintain Contacts</h5>
                      <p>Phone Pocket helps users to keep records of their contacts, emails and phone no.</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="text-center features-item">
                    <div className="col-wrapper">
                      <div className="icon-border">
                        <i class="fa fa-paint-brush fa-3x color-l-blue"></i>
                      </div>
                      <h5>Interactive UI/UX</h5>
                      <p>A simple and easy to use application according to the interests of the users.</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="text-center features-item">
                    <div className="col-wrapper">
                      <div className="icon-border">
                        <i class="fa fa-trash fa-3x color-l-yellow"></i>
                      </div>
                      <h5>Update & Delete</h5>
                      <p>The user can update or delete any contact he/she wishes to.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="Copyright-section">
            <p>
              © Copyright All Rights Reserved
              <br />
              Designed by <span style={{ color: "#F89A99" }}>Lavisha Bhambri</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}