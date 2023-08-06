import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader, { Animation } from '../loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

export const VerifyAccount: React.FC = function () {
  const navigate = useNavigate();
  const token = useParams().token;
  const accessToken = localStorage.getItem('accessToken');

  const [verified, setVerified] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [show, setShow] = React.useState<boolean>(false);
  const [loadingVerifyStep, setLoadingVerifyStep] =
    React.useState<boolean>(true);

  React.useEffect(() => {
    if (token && accessToken) {
      setVerified(true);
      setLoading(false);

      if (accessToken === token) {
        setTimeout(function () {
          setLoadingVerifyStep(false);
          setShow(true);
        }, 3000);

        setTimeout(function () {
          navigate('/editNewUser');
        }, 5000);
      }
    }
  }, [token, accessToken]);

  return (
    <div id="verifyAccountComponent">
      <React.Fragment>
        {verified ? (
          <React.Fragment>
            {
              <div className="d-flex justify-content-center">
                <div>
                  {!show ? (
                    <div className="verificationLoading">
                      <h4 className="text-white">
                        Verifying account, this might take a moment, sit tight
                        🚀
                        {loadingVerifyStep && (
                          <Loader
                            marginTop={'50px'}
                            color={'white'}
                            animation={Animation.GROW}
                          />
                        )}
                      </h4>
                    </div>
                  ) : (
                    <h1 className={'verified text-center'}>
                      Account Verified ✅
                    </h1>
                  )}
                </div>
              </div>
            }
          </React.Fragment>
        ) : (
          <div className="d-flex justify-content-center">
            <div>
              <h1 className="text-center text-white">
                A link was sent to your email, please click on the link to
                verify your account and email address
              </h1>
              {loading && <Loader color={'white'} animation={Animation.GROW} />}
            </div>
          </div>
        )}
      </React.Fragment>
    </div>
  );
};
