
import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <React.Fragment>
            <footer className="footer">
                <div className="container-fluid">
                    <Row>
                        <Col md={6}>
                            {currentYear} &copy; Korth Direct Mortgage Inc. (NMLS ID 1579547)
                            <span className="pl-2 pr-2">|</span> 2937 SW 27th Ave, Ste 307, Miami, FL 33133
                        </Col>

                        <Col md={6}>
                            <div className="text-md-right footer-links d-none d-md-block">
                                <a href="/contact">Contact Us</a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
