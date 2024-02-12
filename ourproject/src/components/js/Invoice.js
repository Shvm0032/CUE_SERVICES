import React, { useState, useEffect } from 'react'
import logo from '../../assets/Logo.png';
import '../css/Invoice.modules.css';
import LoadingOverlay from 'react-loading-overlay-ts';
import http from "../../utils/http-client";
import { useParams } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";
import toast from 'react-hot-toast';

function Invoice() {
  const [loading, setLoading] = useState(false);
  const [invoiceDetail, setInvoice] = useState([]);
  const [errorMessage, setMessage] = useState(undefined);
  const { id } = useParams();
  const fetchProfile = async () => {
    try {
      setLoading(true)
      let url = "/user/invoice/?order_id=" + id;
      console.log(url, 'url');
      var res = await http.get(url);
      console.log(res?.ok, (res?.data))
      if (res?.data.success) {
        setInvoice(res.data.data);
      }
      else {
        console.log(res, "")
        setMessage(res.data.message)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Errro at backend");
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);
  console.log(loading)

  const invoiceInfo = () => {
    console.log(errorMessage, 'errorMessage');
    if (errorMessage) {
      return (
        <div>
          Invoice Not found
        </div>
      );
    }
    console.log(invoiceDetail?.CourseDetail);
    return (
      <div className="tm_invoice_wrap">
        <div className="tm_invoice tm_style1" id="tm_download_section">
          <div className="tm_invoice_in">
            <div className="tm_invoice_head tm_align_center tm_mb20">
              <div className="tm_invoice_left">
                <div className="tm_logo">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
              <div className="tm_invoice_right tm_text_right">
                <div className="tm_primary_color tm_f50 tm_text_uppercase">
                  Invoice
                </div>
              </div>
            </div>
            <div className="tm_invoice_info tm_mb20">
              <div className="tm_invoice_seperator tm_gray_bg"></div>
              <div className="tm_invoice_info_list">
                <p className="tm_invoice_number tm_m0">
                  Invoice No: <b className="tm_primary_color">  {invoiceDetail.InvoiceNumber}</b>
                </p>
                <p className="tm_invoice_date tm_m0">
                  Date: <b className="tm_primary_color">{invoiceDetail.OrderDate}</b>
                </p>
              </div>
            </div>
            <div className="tm_invoice_head tm_mb10">
              <div className="tm_invoice_left">
                <p className="tm_mb2">
                  <b className="tm_primary_color">Invoice To:</b>
                </p>
                <p>
                  {invoiceDetail?.User_Fname+ " "+ invoiceDetail?.User_lname}<br />
                  {invoiceDetail?.Email}<br />
                  {invoiceDetail?.City}<br />
                  {invoiceDetail?.State},
                  {invoiceDetail?.Zip}<br />
                  {invoiceDetail?.Country}


                </p>
              </div>
              <div className="tm_invoice_right tm_text_right">
                <p className="tm_mb2"><b className="tm_primary_color">Pay To:</b></p>
                <p>
                 
                  {invoiceDetail?.CompanyName}<br />
                  {invoiceDetail?.CompanyAddress}<br />
                  {invoiceDetail?.CompanyEmail}
                </p>
              </div>
            </div>
            <div className="tm_table tm_style1 tm_mb30">
              <div className="tm_round_border">
                <div className="tm_table_responsive">
                  <table>
                    <thead>
                      
                      <tr>
                      <th
                          className="tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg"
                        > Order Id</th>
                        <th
                          className="tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg"
                        >
                          Product
                        </th>
                        <th
                          className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg"
                        >
                          Selling Options
                        </th>
                        <th
                          className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg"
                        >
                          Quantity
                        </th>

                        <th
                          className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right text-center"
                        >
                           Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {invoiceDetail?.CourseDetail && JSON.parse(invoiceDetail?.CourseDetail).map((item, itemIndex) => (
                                <tr key={itemIndex}>
                                  <td>
                                   <center> {invoiceDetail.OrderId}</center>
                                  </td>
                                  <td>
                                    {item.course_title}
                                  </td>
                                  <td>
                                    <table className='table'>
                                      <tbody>
                                        {item.courseItems && (item.courseItems).map((spitem, spid) => (
                                          <tr key={spid}>
                                            <td>{spitem.itemName}</td>
                                            <td>{spitem.itemPrice}</td>
                                          </tr>
                                        ))}

                                      </tbody>
                                    </table>
                                  </td>
                                  <td><center>{item.qty}</center></td>
                                  <td><center>{item.totalPrice}</center></td>
                                </tr>
                              ))}

                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tm_invoice_footer">
                <div className="tm_left_footer">
                  <p className="tm_mb2">
                    <b className="tm_primary_color">Payment info:</b>
                  </p>
                  <p className="tm_m0">
                    payer Email - {invoiceDetail?.Email}<br /> <br />Amount : ${invoiceDetail?.TotalAmount} <br /> Transaction Id : {invoiceDetail.InvoiceNumber}
                  </p>
                </div>
                <div className="tm_right_footer">
                  <table>
                    <tbody>
                      <tr>
                        <td
                          className="tm_width_3 tm_primary_color tm_border_none tm_bold"
                        >
                          Subtoal
                        </td>
                        <td
                          className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold"
                        >
                           ${invoiceDetail?.TotalAmount}                      </td>
                      </tr>
                      <tr>
                        <td
                          className="tm_width_3 tm_primary_color tm_border_none tm_pt0"
                        >
                          Discount <span className="tm_ternary_color"></span>
                        </td>
                        <td
                          className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0"
                        >
                          {invoiceDetail?.Discount } 
                                          </td>
                      </tr>
                      <tr className="tm_border_top tm_border_bottom">
                        <td
                          className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color"
                        >
                          Grand Total
                        </td>
                        <td
                          className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right"
                        >
                           ${invoiceDetail?.TotalAmount+parseInt(invoiceDetail?.Discount)}                     </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="tm_padd_15_20 tm_round_border">
              <p className="tm_mb5">
                <b className="tm_primary_color">Terms & Conditions:</b>
              </p>
              <ul className="tm_m0 tm_note_list">
                <li>
                  Payment(<strong>${invoiceDetail?.TotalAmount}</strong>) Processed by paypal, Transaction ID <strong>{invoiceDetail.InvoiceNumber} </strong>. This is an electronically generated
                  invoice/receipt and does not require any signature or official stamp.

                </li>
                <li>
                  Billing & Payments: ceutrainers manages the payments done on our website, which are secured throughPaypal payment processor. All your bank/credit/debit card/PayPal, and/or any other billing statements will disclose
                  "ceuTrainers Webinar" for your payments done to ceu-trainers.com For any inquiries regarding yearly subscription, billing info,
                  corrections to your invoice, etc., please contact us at <a href="mailto:support@ceutrainers.com"> support@ceutrainers.com</a> Our service hours are: Mon - Fri, 10 am - 5 pm EST. All
                  the delivery are done on email In case your firewall blocked our email. Please contact us / Write to us/ Go to live Chat. We will
                  Respond to you Soon
                </li>
                <li>For terms and use :- <a href="https:///privacy-policy" target="_blank">ceu-trainers.com/privacy-policy</a></li>
              </ul>
            </div>
            {/* .tm_note */}
          </div>
        </div>
        <div className="tm_invoice_btns tm_hide_print">
          <button className="tm_invoice_btn tm_color1" onClick={() => window.print()}>
            <span className="tm_btn_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
                <rect
                  x="128"
                  y="240"
                  width="256"
                  height="208"
                  rx="24.32"
                  ry="24.32"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
                <path
                  d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
                <circle cx="392" cy="184" r="24" fill="currentColor" />
              </svg>
            </span>
            <span className="tm_btn_text">Print</span>
          </button>
          <button id="tm_download_btn" className="tm_invoice_btn tm_color2">
            <span className="tm_btn_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>
            </span>
            <span className="tm_btn_text">Download</span>
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="tm_container">
      <LoadingOverlay
        active={loading}
        spinner={<FadeLoader color="#36d7b7" />}
        text="Loading..."
      >
        {
          loading ? null :
            (
              invoiceInfo()
            )
        }

      </LoadingOverlay>
    </div>
  );

}

export default Invoice;
