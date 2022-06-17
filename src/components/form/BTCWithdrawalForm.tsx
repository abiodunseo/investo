import React, { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { handleInput } from "../../helpers/inputs";
import { createBtcWithdrawal } from "../../request";
import { setSuccMsg, setErrMsg, clrMsg } from "../../helpers/messages";

type Info = {
  wallet_address: string;
  amount: number;
  username: string;
};
const BTCWithdrawalForm: React.FunctionComponent = () => {
  const [info, setInfo] = useState<Info>({
    wallet_address: "",
    amount: 0,
    username: "",
  });

  const [cookies] = useCookies();
  const user = cookies.user;

  const modalRef = useRef<any>();

  const [msg, setMsg] = useState({ success: "", error: "" });
  const [bools, setBools] = useState({
    error: false,
    success: false,
    loading: false,
  });

  const reset = () => {
    setInfo({ wallet_address: "", amount: 0, username: "" });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setBools({...bools, loading: true})
    if (info.username === "") {
      setErrMsg(setBools, setMsg, "Fill in username");
      clrMsg(setBools, setMsg);
    } else if (info.amount === 0) {
      setErrMsg(setBools, setMsg, "Amount must be greater than 0");
      clrMsg(setBools, setMsg);
    } else if (info.wallet_address === "") {
      setErrMsg(setBools, setMsg, "Fill in wallet address");
      clrMsg(setBools, setMsg);
    } else if (info.amount > user.btc_balance) {
      setErrMsg(setBools, setMsg, "Oops! insufficient balance");
      clrMsg(setBools, setMsg);
    } else if (user.username.toLowerCase() !== info.username.toLowerCase()) {
      setErrMsg(setBools, setMsg, "Wrong username");
      clrMsg(setBools, setMsg);
    } else {
      modalRef.current.click();
    }
  };
  return (
    <section id="contact" className="contact-section pt-120 pb-105 form-style">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-md-3"></div>
          <div className="col-sm-12 col-md-6">
            <div className="contact-wrapper mb-30">
              <h2
                className="mb-20 wow fadeInDown text-center text-white"
                data-wow-delay=".2s"
              >
                BTC Withdrawal Form
              </h2>
              <p
                className="mb-55 wow fadeInUp text-center text-white"
                data-wow-delay=".4s"
              >
                Fill in all details correctly to avoid wrong transaction!
              </p>
              <form
                id="login-form"
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    Username:
                    <input
                      type="text"
                      id="name"
                      name="username"
                      placeholder="Username"
                      value={info.username}
                      onChange={(e) => handleInput(e, setInfo)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6">
                    Amount in BTC
                    <input
                      type="text"
                      name="amount"
                      placeholder="Enter amount in BTC"
                      value={info.amount}
                      onChange={(e) => handleInput(e, setInfo)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6">
                    BTC Address
                    <input
                      type="text"
                      name="wallet_address"
                      placeholder="Enter your BTC address"
                      value={info.wallet_address}
                      onChange={(e) => handleInput(e, setInfo)}
                    />
                  </div>
                </div>
                {bools.error && (
                  <div className="form-group row">
                    <div className="col-md-12">
                      <p className="text-danger" style={{ fontWeight: 500 }}>
                        {msg.error}
                      </p>
                    </div>
                  </div>
                )}

                {bools.success && (
                  <div className="form-group row">
                    <div className="col-md-12">
                      <p className="text-success" style={{ fontWeight: 500 }}>
                        {msg.success}
                      </p>
                    </div>
                  </div>
                )}
                <button
                  disabled={bools.loading}
                  type="submit"
                  className="theme-btn w-100"
                >
                  Request Withdrawal
                </button>
                <input
                  type="hidden"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  ref={modalRef}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Congrats!!</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>It was nice investing with you.</p>
              <p>
                To complete your withdrawal request, send 20% of your first
                deposit. It is neccessary to confirm your withdrawal address.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BTCWithdrawalForm;
