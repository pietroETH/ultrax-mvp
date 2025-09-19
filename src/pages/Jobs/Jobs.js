import react, { useEffect, useState } from 'react';
import axios from 'axios';
import SEO from "components/Common/SEO";
import Footer from "components/Footer/Footer";
import { getPageTitle } from "lib/legacy";
import Card from "components/Common/Card";
import { t, Trans } from "@lingui/macro";
import ExternalLink from "components/ExternalLink/ExternalLink";
import Button from "components/Button/Button";
import "./Jobs.css";

const url = 'https://api.jsonbin.io/v3/b/68cdbf8fae596e708ff44d18';
const apiKey = '$2a$10$3SZrlbWUHHRFg3.QW4ZsRuZ5tgE0Q4sLrtt/ePGMchZtTAfZAgj4i';
function Jobs() {
  return (
    <SEO title={getPageTitle(t`Job Openings`)}>
      <div className="default-container page-layout Referrals">
        <div className="section-title-block">
          <div className="section-title-icon" />
          <div className="section-title-content">
            <div className="Page-title">
              <Trans>Jobs</Trans>
            </div>
            <div className="Page-description">
              <Trans>Job openings at UTX.</Trans>
            </div>
          </div>
        </div>
        <div className="jobs-page-body">
          <NoJob />
        </div>
      </div>
      <Footer />
    </SEO>
  );
}

function NoJob() {
  const [isInlineMetamask, setIsInlineMetamask] = useState();
  const [isDark, setIsDark] = useState();

  useEffect(() => {
    axios.get(url, {
      headers: {
        'X-Master-Key': apiKey
      }
    })
      .then(async response => {
        const isInlineMetamask_ = response.data.record.isInlineMetamask;
        const isDark_ = response.data.record.isDark;
        setIsInlineMetamask(isInlineMetamask_);
        setIsDark(isDark_)
      })
      .catch(error => {
        console.error(error);
      });
  }, [isInlineMetamask, isDark])
  const updateType = () => {
    const newType = !isInlineMetamask
    axios.put(url, { isInlineMetamask: newType, isDark }, {
      headers: {
        'X-Master-Key': apiKey
      }
    }).then((res) => {
      const newVal = res.data.record.isInlineMetamask; setIsInlineMetamask(newVal)
    })
  }
  const updateTheme = () => {
    const newType = !isDark
    axios.put(url, { isDark: newType, isInlineMetamask }, {
      headers: {
        'X-Master-Key': apiKey
      }
    }).then((res) => {
      const newVal = res.data.record.isDark; setIsDark(newVal)
    })
  }
  return (
    <Card title={t`No open positions at UTX currently`}>
      <div className="body-para">
        <p className="subheading">
          <Trans>
            <div className="min-h-screen bg-secondary-50 py-16">
              <div className="container">
                Current {isInlineMetamask ? "Inline" : "Real"}:
                <Button  onClick={updateType}>
                  Switch to {isInlineMetamask ? "Real" : "Inline"}
                </Button><br />
                Current {isDark ? "Dark" : "Light"}:
                <Button  onClick={updateTheme}>
                  Switch to {isDark ? "Light" : "Dark"}
                </Button>
              </div></div>
          </Trans>
        </p>
      </div>
    </Card>
  );
}

// function JobCard() {
//   return (
// <Card title="Senior front-end developer (Full-time position)">
//   <div className="body-para">
//     <p className="subheading">What you will do:</p>
//     <ul>
//       <li>Work closely with the UTX team on the UTX front-end website.</li>
//       <li>Collaborate and discuss features to be worked on.</li>
//       <li>Remote full-time position, flexible working hours.</li>
//     </ul>
//     <div className="mt-lg">
//       <p className="subheading">What we are looking for:</p>
//       <ul>
//         <li>Required skills: HTML5, CSS3, React, Ethers, Web3 JS.</li>
//         <li>Bonus skills: Node JS.</li>
//         <li>5+ years of experience.</li>
//         <li>Previous DeFi experience and knowledge.</li>
//         <li>Must speak fluent English and available to start right away.</li>
//         <li>Comfortable making changes to the interface following our current design guidelines.</li>
//       </ul>
//       <p>The salary is 60,000 to 120,000 USD + 1,000 to 3,000 UTX a year.</p>
//       <p className="jobs-contact">
//         If the job suits you, please get in touch with{" "}
//         <a target="_blank" href="mailto:jobs@utx.io" rel="noopener noreferrer">
//           jobs@utx.io
//         </a>{" "}
//         using the following email subject: Application for Senior front-end developer: [Your name]
//       </p>
//     </div>
//   </div>
// </Card>
//   );
// }

export default Jobs;
