import React, {Component} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default class Partner extends Component{
  render(){
    return(
      <div className="about">
        <Navbar />
        <div  className="about-styles text-center ">
          <div className="overlay">
            <img src="../assets/images/partners.jpg" className="img-header" />
            <div className="middle-title">
              <div className="title-container">
                <h1 className="white bold ">
                  Coming together is a beginning; keeping together is progress; working together is success
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="container partner-container margin-bottom-50">
            <p className="primary-black">
              Our journey so far, has brought us closer to many concerned individuals and organisations who have extended their help in developing a possible solution. We would like to acknowledge all our partners -- the individuals who are playing an active advisory role and the organisations that are supporting us in building the foundation.
            </p>
            <p className="primary-black">
              The list below is not a static list. It is expected to expand. We request you to help us in expanding it by adding yourself as a concerned partner. If you wish to run side-by -side with us or provide valuable advice through your unique capabilities & experiences, then join hands with us to help in building the existing idea or shaping up a new idea which can contribute to a positive change within the society. Kindly click here and help us know you better and how you can support us in this initiative. Please suggest us the activities, take ownership and drive the initiative for a revolutionary change.
            </p>
          </div>
        </div>

        <div className="bg-gray">
          <div className="container partner-container margin-bottom-50">
            <p className="primary-black bold">
              We are specifically looking for support on the following fronts:
            </p>
            <ul className="partners-list">
              <li>
                Anything you feel we have unconsciously missed or not addressed properly.
              </li>
              <li>
                Spreading awareness amongst the citizens about the air-quality problem and how their monitoring can possibly help in developing knowledge and driving action.
              </li>
              <li>
                Making the dream of having 1000s of AirOwls or any other open source monitoring devices installed across the country and sending minute by minute data to the platform, a reality.
              </li>
              <li>
                Sharing the existing solutions in the public space to other makers worldwide to further improve the hardware design and to bring down the cost and promote adoption of the idea.
              </li>
              <li>
                Inform the environmental scientists, opinion leaders, politicians, policy makers, media activists and anyone else who is relevant to utilize the data, freely available for their respective use.
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white">
          <div className="container partner-container">
            <h3 className="text-center margin-bottom-25 ">
              Partners
            </h3>

            <div className="row margin-bottom-50">
              <div className="col-md-3">
                <div className="partner-img-container" style={{paddingTop: '40px'}}>
                  <img className="img-responsive partner-img" src="assets/images/partners/arunverma.gif" />
                </div>
                <p className="partner-title">
                  Arun Verma, Design Studio, Noida
                </p>
                <p className="partner-role">
                  Digital & Print Design/Storytelling
                </p>
              </div>

              <div className="col-md-3">
                <div className="partner-img-container">
                  <img className="img-responsive partner-img" src="assets/images/partners/bold.png" />
                </div>
                <p className="partner-title">
                  Bold Kiln, Noida
                </p>
                <p className="partner-role">
                  Marketing Support
                </p>
              </div>

              <div className="col-md-3">
                <div className="partner-img-container">
                  <img className="img-responsive partner-img" src="assets/images/partners/jamia.jpg" />
                </div>
                <p className="partner-title">
                  CCMG, Jamia Milia Islamia, Delhi
                </p>
                <p className="partner-role">
                  Academic Partner
                </p>
              </div>

              <div className="col-md-3">
                <div className="partner-img-container">
                  <img className="img-responsive partner-img" src="assets/images/partners/cmee.png" />
                </div>
                <p className="partner-title">
                  CMEE, IIM Lucknow
                </p>
                <p className="partner-role">
                  Corporate Front Ending & Marketing Advisory Partner
                </p>
              </div>
            </div>

            <div className="row margin-bottom-50">
              <div className="col-md-3">
                <div className="partner-img-container" style={{paddingTop: '40px'}}>
                  <img className="img-responsive partner-img" src="assets/images/partners/smartmandate.png" />
                </div>
                <p className="partner-title">
                  Juxt Smart Mandate
                </p>
                <p className="partner-role">
                  Data Analytics/Seed Fund
                </p>
              </div>

              <div className="col-md-3">
                <div className="partner-img-container">
                  <img className="img-responsive partner-img" src="assets/images/partners/oizom-about.svg" />
                </div>
                <p className="partner-title">
                  Oizom Instruments
                </p>
                <p className="partner-role">
                  Makers - Hardware Assembly, Data Visualisation Platform, Mobile App (V1)
                </p>
              </div>

              <div className="col-md-3">
                <div className="partner-img-container" style={{paddingTop: '40px'}} >
                  <img className="img-responsive partner-img" src="assets/images/partners/seedstudio.png" />
                </div>
                <p className="partner-title">
                  Seeed Studio, ShenZhen
                </p>
                <p className="partner-role">
                  Opensource Hardware Components/Sensors Sourcing
                </p>
              </div>

              <div className="col-md-3">
                <div className="partner-img-container" style={{paddingTop: '40px'}}>
                  <img className="img-responsive partner-img" src="assets/images/partners/urja.jpg" />
                </div>
                <p className="partner-title">
                  URJA, Delhi
                </p>
                <p className="partner-role">
                  RWA, Delhi Local Community Activation
                </p>
              </div>
            </div>
          </div>

          <div className="container partner-container margin-bottom-50">
            <h3 className="text-center margin-bottom-25 ">
              Advisors
            </h3>

            <table className="table table-stripped">
              <thead>
              <tr>
                <th className=""> Name </th>
                <th className="text-left" > Organization </th>
                <th className="text-center" > Profile </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td > Ashutosh Dikshit </td>
                <td className="text-left"> CEO, URJA </td>
                <td className="text-center"> <a href="https://in.linkedin.com/in/ashutosh-dikshit-a0733bb" target="_blank" ><i className="fa fa-linkedin primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Deepak Chaudhary </td>
                <td className="text-left"> Renowned Pulmonologist </td>
                <td className="text-center"> <a href="https://www.practo.com/delhi/clinic/dr-deepak-chaudhary-clinic-defence-colony " target="_blank" ><i className="fa fa-user-md primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Jai Dhar Gupta </td>
                <td className="text-left"> Founder, Nirvanabeing </td>
                <td className="text-center"> <a href="http://starparents.org/jai-dhar-gupta/" target="_blank" ><i className="fa fa-user primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Krishna Kumar </td>
                <td className="text-left"> COO, 9.9 Tech </td>
                <td className="text-center"> <a href="https://in.linkedin.com/in/kkumarkg " target="_blank" ><i className="fa fa-linkedin primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Laveesh Bhandari </td>
                <td className="text-left"> Economist </td>
                <td className="text-center"> <a href="https://in.linkedin.com/in/laveeshbhandari" target="_blank" ><i className="fa fa-linkedin primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Nikhil Pahwa </td>
                <td className="text-left"> Founder, Editor and Publisher, Medianama </td>
                <td className="text-center"> <a href="https://www.linkedin.com/in/nikhilpahwa" target="_blank" ><i className="fa fa-linkedin primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Mehmood Khan </td>
                <td className="text-left"> Former Global Innovation Leader, Unilever Trustee, Rasuli Kanwar Khan Trust </td>
                <td className="text-center"> <a href="http://forbesindia.com/article/person-of-the-year-09/the-maverick/8142/2" target="_blank" ><i className="fa fa-user primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Pradeep Panigrahi </td>
                <td className="text-left"> Environmental Science Expert </td>
                <td className="text-center"> <a href="https://www.linkedin.com/in/dr-pradeep-panigrahi-4383081b" target="_blank" ><i className="fa fa-linkedin primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Sanjay Sindhwani </td>
                <td className="text-left"> Businesshead, Economic Times</td>
                <td className="text-center"> <a href="https://in.linkedin.com/in/sindhwani " target="_blank" ><i className="fa fa-linkedin primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Sidharth Rao </td>
                <td className="text-left"> CEO & Co-founder, WebChutney Studio (Leading Digital Marketing Co.)</td>
                <td className="text-center"> <a href="https://in.linkedin.com/in/sidharthrao  " target="_blank" ><i className="fa fa-linkedin primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Dr Sunita Purushottam </td>
                <td className="text-left"> Expert, Air quality and GHG emissions</td>
                <td className="text-center"> <a href="https://www.linkedin.com/in/sunitapurushottam " target="_blank" ><i className="fa fa-linkedin primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Thejesh GN</td>
                <td className="text-left"> Co-founder, DataMeet</td>
                <td className="text-center"> <a href="https://www.linkedin.com/in/thejeshgn" target="_blank" ><i className="fa fa-linkedin primary-black"></i></a></td>
              </tr>
              <tr>
                <td > Ulrike Reinhard</td>
                <td className="text-left"> Digital Nomad & Futurist</td>
                <td className="text-center"> <a href="http://www.ulrikereinhard.com/" target="_blank" ><i className="fa fa-globe primary-black"></i></a></td>
              </tr>
              </tbody>

            </table>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}
