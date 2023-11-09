import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Contact = () => {
  const { isAuthenticated, user } = useAuth0();

  const formSpreeApi = process.env.REACT_APP_FORMSPREE_API_URL;

  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          .disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          input[type="submit"] {
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
    <Wrapper>
      <h2 className="common-heading">Feel Free To Contact Us</h2>
      <iframe
        title="location"
        id="frame1"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27859.062210337655!2d78.93632333758917!3d29.212293522576303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a43c0c5694dd1%3A0xe193d5f15c9333a0!2sKashipur%2C%20Uttarakhand%20244713!5e0!3m2!1sen!2sin!4v1695044242073!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="container">
        <div className="contact-form">
          <form action={formSpreeApi} method="POST" className="contact-inputs">
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              autoComplete="off"
              value={isAuthenticated ? user.name : ""}
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
              value={isAuthenticated ? user.email : ""}
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"
            ></textarea>

            {!isAuthenticated ? (
              <input
                type="submit"
                className="disabled"
                disabled
                value="send"
                title="You need to be Logged in to send feedback"
              />
            ) : (
              <input type="submit" value="send" />
            )}
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
