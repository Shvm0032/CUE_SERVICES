import React from 'react';
import logo from '../../assets/Logo.png';
import Invoic from '../css/Invoice.modules.css';


class Invoice extends React.Component {
  render() {
    return (
      <div className="tm_container">
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
                    Invoice No: <b className="tm_primary_color"> CEU729852</b>
                  </p>
                  <p className="tm_invoice_date tm_m0">
                    Date: <b className="tm_primary_color">2024-01-24 15:42:05</b>
                  </p>
                </div>
              </div>
              <div className="tm_invoice_head tm_mb10">
                <div className="tm_invoice_left">
                  <p className="tm_mb2">
                    <b className="tm_primary_color">Invoice To:</b>
                  </p>
                  <p>
                     Natalie Lagunas<br />McGuireWoods LLP<br />1800 Century Park East<br />California<br />United States (USA)<br />90067
                  </p>
                </div>
                <div className="tm_invoice_right tm_text_right">
                  <p className="tm_mb2"><b className="tm_primary_color">Pay To:</b></p>
                  <p>
                    304 S. Jones Blvd #5255,  <br />
                    Las Vegas,NV, 89107 <br />
                    United States <br />
                    info@ceutrainers.com
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
                          >
                            Item
                          </th>
                          <th
                            className="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg"
                          >
                           Webinar
                          </th>
                          <th
                            className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg"
                          >
                            selling options
                          </th>
                         
                          <th
                            className="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="">1</td>
                          <td className="tm_width_6">
                            Employee Handbook & NLB Audits - 2024 Updates: From the PUMP Act to Stericycle - What Employers need to know for 2024                        </td>
                          <td className="tm_width_2"> 
                                                                                 
                                                                                            
                                                                                      
                                                                                                    3 Attendees<br />(Get 3 On Demands FREE)                                                                        $455                                                                    
                                                                                                                                              
                                                                                               
                                                                                          
                          
                          </td>
                          
                          <td className="tm_width_2 tm_text_right">$455.00</td>
                        </tr>
                      

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
                      payer Email - nlagunas@mcguirewoods.com <br />Amount: $455.00 <br /> Transaction Id : $56431662860107717
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
                           $455.00                        </td>
                        </tr>
                        <tr>
                          <td
                            className="tm_width_3 tm_primary_color tm_border_none tm_pt0"
                          >
                            Discount <span className="tm_ternary_color">(0%)</span>
                          </td>
                          <td
                            className="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0"
                          >
                          $0                        </td>
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
                            $455.00                        </td>
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
                    Payment(<strong>$455.00.00</strong>) Processed by paypal, Transaction ID <strong>  56431662860107717 </strong>This is an electronically generated
                  invoice/receipt and does not require any signature or official stamp.

                  </li>
                  <li>
                 Billing & Payments: ceutrainers manages the payments done on our website, which are secured throughPaypal payment processor. All your bank/credit/debit card/PayPal, and/or any other billing statements will disclose
                          "ceuTrainers Webinar" for your payments done to ceu-trainers.com For any inquiries regarding yearly subscription, billing info,
                       corrections to your invoice, etc., please contact us at <a href="mailto:support@ceutrainers.com"> support@ceutrainers.com</a> Our service hours are: Mon - Fri, 10 am - 5 pm EST. All
                     the delivery are done on email In case your firewall blocked our email. Please contact us / Write to us/ Go to live Chat. We will
                Respond to you Soon
                  </li>
                  <li>For terms and use :- <a href="https://ceu-trainers.com/privacy-policy" target="_blank">ceu-trainers.com/privacy-policy</a></li>
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
      </div>
    );
  }
}

export default Invoice;
