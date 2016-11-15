import React, {Component} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default class About extends Component{
  render(){
    return(
      <div className="about">
        <Navbar />
        <div  className="about-styles text-center ">
          <div className="overlay">
            <img src="../assets/images/about.jpg" className="img-header" />
              <div className="middle-title">
                <div className="title-container">
                  <h1 className="white bold ">
                    Air-quality situation across world is a ‘complex problem’.
                  </h1>
                </div>
              </div>
          </div>
        </div>
        <div className="bg-gray">
          <div className="container about-container">
            <div className="img-middle">
              <img className="img-responsive" src="../assets/images/indiaopendata-about.png" />
            </div>

            <p className="primary-black">
              The India Open Data Association (IODA), is a platform which promotes and supports different open data initiatives in India. It’s an association of various Indian companies, enthusiasts, research institutes and academic departments, all with a keen interest in putting open data into mainstream. It follows the principle of:
            </p>

            <div className="img-middle">
              <img className="img-responsive " src="assets/images/dka.png" />
            </div>


            <p className="primary-black">
              The key emphasis for us is proper visualization of the data, accessible to all. Only then the "data" can generate public awareness and trigger an active community action to solve the problems which are of public interest. Open data initiatives in India have remained more or less confined towards presenting the collected information in a raw format. The key essence that has been missing so far is to create individual and collective knowledge out of this data which then can promote and trigger a positive change within the society. This is what IODA aims for and is in-process to achieve through its "Open Environment Data Project" in Delhi.
            </p>

            <p className="primary-black bold">
              Some of the key objectives of IODA are:
            </p>
            <ul  className="partners-list">
              <li>
                Creating an online platform to showcase the idea of open data and open data projects to the public.
              </li>
              <li>
                Providing an online space for different open data enthusiasts to come together and engage in open data initiatives.
              </li>
              <li>
                Connecting different open data organizations and empower them to collectively design and implement open data projects which have a meaningful impact on society.
              </li>
              <li>
                Showcasing information in an easy-to-understand visualized format.
              </li>
              <li>
                Providing a forum for a healthy discussion on various open data initiatives and its related topics.
              </li>
              <li>
                Creating noise within the society through the information that can ultimately translate into a sound collective community action.
              </li>
            </ul>
            <p className="primary-black" style={{fontStyle: 'italic'}}>
              All the data is shared under a "Creative Commons Licence" (Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) licence).
            </p>
          </div>
        </div>

        <div className="bg-white" style={{padding: '25px 0'}}>
          <div className="container about-container">
            <h2 className="text-center">
              The Open Ecosystem for Environment Monitoring
            </h2>


            <p className="primary-black">
              Convenient conceptual frameworks may not be adequate enough to address the growing problem of air pollution. Although these tactics may appear to be easily accessible and comfortable in practice, however, presence of uncertainty and incomplete nature of knowledge may hinder the process of applying custom-based solutions to big problems like ‘Making Air-Quality Better’. Only through complete knowledge about a situation, can an individual have the required capability to address and possibly contain the issue. Absence of proper knowledge cannot result in sound and productive action to curb any issue of immense public concern. One has to have full knowledge about the problem, in order to bring about a holistic change within the society. W.Ross Ashby famously said, ‘only variety destroys variety’.
            </p>
            <p className="primary-black">
              We have a complex problem in hand and it requires a complex solution, not a complicated solution. This is only attainable through access to different forms of knowledge about the situation in hand.
            </p>
          </div>
        </div>

        <div className="bg-gray">
          <div className="container about-container">
            <h2 className="text-center">
              Why Support Us?
            </h2>

            <p className="primary-black">
              We believe in the idea that by consolidating an active community and directing them towards a public concern, where the solutions are designed by them rather than being directly/indirectly enforced upon, can help in bringing about the desirable qualitative change, which is so far missing, especially in the case of air-quality management. No single entity, be it an individual, an organization or the government can by itself provide the remedies to such concerns. It is a complex problem which requires a networked solution by involving all these entities. Through "Air Pollution.Online", we hope to provide a platform, developed out of the first open-data project of India Open Data Association (IODA), where people of diverse backgrounds can come together, access the knowledge and share their feedbacks to enable an action which is unique, multi-dimensional and is able to hit the roots of the growing concern like, poor air-quality management in Delhi.
            </p>
            <p className="primary-black">
              A collective effort is something we hope to promote as well as develop strong web of networks between different stakeholders to address the multiple layers of the situation in hand. We are not contemplating on presenting a specific kind of solution to the public, rather we are contemplating on creating a space where the people as concerned citizens can contribute by sharing solutions which they think is apt for addressing the concern, which ultimately can lead to a sound change within the society.
            </p>
            <p className="primary-black">
              Our initiative depends on each and every concerned member, organization, and group etc. of the society. Without the collective effort, the solution is unachievable. We need your support. Please join our network to participate and contribute to this growing concern of air pollution. Let us together address the issue of air-quality management in cities like Delhi, Mumbai, Ahmedabad…, and possibly the whole India. Please join India Open Data Association to bring about a positive change within the society.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
