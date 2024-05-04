import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const SocialButton = ({ platform, onClick }) => {
    let icon;
    switch (platform) {
        case 'instagram':
            icon = <FontAwesomeIcon icon={faInstagram} />;
            break;
        case 'facebook':
            icon = <FontAwesomeIcon icon={faFacebookF} />;
            break;
        case 'linkedin':
            icon = <FontAwesomeIcon icon={faLinkedinIn} />;
            break;
        default:
            icon = null;
    }

    return (
        <button className={`social-icons ${platform}`} onClick={() => onClick(platform)}>
            {icon}
        </button>
    );
};

export default SocialButton;
