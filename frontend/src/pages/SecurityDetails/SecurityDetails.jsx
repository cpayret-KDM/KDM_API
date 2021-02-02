import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Label, Button, InputGroupAddon, Table, Card, CardBody, Spinner } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import moment from 'moment';

import PageTitle from '../../components/PageTitle';
import ModalProperty from './ModalProperty';
import ModalDeleteProperty from './ModalDeleteProperty';
import ModalDeleteSecurity from './ModalDeleteSecurity';
import DatePicker from 'react-datepicker';
import { getSecurity, createSecurity, editSecurity, deleteSecurity, clearSecurity, getRatings } from '../../redux/actions';

const SecurityDetails = (props) => {
  const { security = {}, loaded } = props;
  const creating = (props.mode === 'create');
  const editing = (props.mode === 'edit');
  const viewing = !editing && !creating;

  const { id } = props?.match?.params;
  useEffect(() => {
    if (!creating) {
      props.getSecurity(id);
    } else {
      props.clearSecurity();
    }
  }, [creating, id]);

  const [property, setProperty] = useState({});
  const [propertyMode, setPropertyMode] = useState('create');
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showDeletePropertyModal, setShowDeletePropertyModal] = useState(false);
  const [showDeleteSecurityModal, setShowDeleteSecurityModal] = useState(false);

  // const tradeDate = security.tradeDate
  // const maturityDate = security.maturityDate
  // const [tradeDate, setTradeDate] = useState(security.tradeDate, new Date());
  // const [maturityDate, setMaturityDate] = useState(security.maturityDate, new Date());
  const [tradeDate, setTradeDate] = useState(new Date());
  const [maturityDate, setMaturityDate] = useState(new Date());
  useEffect(() => {
    props.getRatings();
    if (!security.tradeDate) return;
    if (!security.maturityDate) return;
    setTradeDate(moment(security.tradeDate).toDate());
    setMaturityDate(moment(security.maturityDate).toDate());
  }, [security]);

  // const [maturityDate, setMaturityDate] = useState(new Date());
  // useEffect(() => {
  //   setMaturityDate(moment(security.maturityDate).toDate());
  // }, [security]);

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (props.added || props.edited) {
      setIsSaving(false);
    }
    // setTradeDate(moment(security.tradeDate).toDate());
    // setMaturityDate(moment(security.maturityDate).toDate());
  }, [props.added, props.edited]);

  /* UI */
  const breadcrumb = ((mode) => {
    switch (mode) {
      case 'create':
        return { label: 'Create New Security', path: '/securities/create' };
      case 'edit':
        return { label: 'Edit Security', path: `/securities/${id}/edit` };
      default:
        return { label: 'Security Details', path: `/securities/${id}` };
    }
  })(props.mode);

  const title = ((mode) => {
    switch (mode) {
      case 'create':
        return 'Create New Security';
      case 'edit':
        return 'Edit Security';
      default:
        return 'Security Details';
    }
  })(props.mode);

  /* Security */
  const submitSecurity = (e, errors, values) => {
    if (errors.length !== 0) return;

    const newSecurity = {
      ...security,
      ...values,
      tradeDate: tradeDate,
      maturityDate: maturityDate,
    };

    if (editing) {
      props.editSecurity(newSecurity);
    }
    if (creating) {
      props.createSecurity(newSecurity);
      // temporary until specifications received on styling, UI and such
      alert("Security Created");
      window.location.href = "/securities/list";
    }
  }

  const handleDeleteSecurity = (securityId) => {
    setShowDeleteSecurityModal(true);
  }

  const handleAddNewProperty = () => {
    setProperty({});
    setPropertyMode('create');
    setShowPropertyModal(true);
  }

  const handleEditProperty = (property) => {
    setProperty({ ...property });
    setPropertyMode('edit');
    setShowPropertyModal(true);
  }

  const handleDeleteProperty = (property) => {
    setProperty({ ...property });
    setShowDeletePropertyModal(true);
  }

  const toggleDeletePropertyModal = () => {
    setShowDeletePropertyModal(!showDeletePropertyModal);
  }

  const toggleShowPropertyModal = () => {
    setShowPropertyModal(!showPropertyModal);
  }

  const toggleDeleteSecurityModal = () => {
    setShowDeleteSecurityModal(!showDeleteSecurityModal);
  }

    /* Ratings */
    const [securityRatings, setsecurityRatings] = useState([]);
    useEffect(() => {
      if (security.ratings) {
        setsecurityRatings(security.ratings);
      }
    }, [security]);
  
    const [agencyRatings, setAgencyRatings] = useState([]);
    useEffect(() => {
      if (props.agencyRatings) {
        let formattedAgencyRatings = [];
        Object.entries(props.agencyRatings).forEach((rating, i) => {
          formattedAgencyRatings.push({
            agency: rating[0],
            values: rating[1]
          });
        });
        setAgencyRatings(formattedAgencyRatings);
      }
    }, [props.agencyRatings]);
  
    const addNewsecurityRating = () => {
      const newsecurityRatings = [...securityRatings];
      newsecurityRatings.push({
        agency: agencyRatings[0].agency,
        value: agencyRatings[0].values[0],
        date: '',
      });
      setsecurityRatings([...newsecurityRatings]);
    }
    // useEffect(() => {
    //   console.log('securityRatings array change', securityRatings)
    // }, [securityRatings]);
  
    const handlesecurityRatingAgencyChange = (e, i) => {
      const newsecurityRatings = [...securityRatings];
      newsecurityRatings[i].agency = e.target.value;
      agencyRatings.forEach((rating, k) => {
        if (rating.agency === e.target.value) {
          newsecurityRatings[i].value = rating.values[0].value;
        }
      });
      setsecurityRatings([...newsecurityRatings]);
    }
    const handlesecurityRatingValueChange = (e, i) => {
      const newsecurityRatings = [...securityRatings];
      newsecurityRatings[i].value = e.target.value;
      setsecurityRatings([...newsecurityRatings]);
    }
    const handlesecurityRatingDateChange = (date, i) => {
      const newsecurityRatings = [...securityRatings];
      newsecurityRatings[i].date = date;
      setsecurityRatings([...newsecurityRatings]);
    }
    const handleRemovesecurityRating = (i) => {
      const newsecurityRatings = [...securityRatings];
      newsecurityRatings.splice(i, 1);
      setsecurityRatings([...newsecurityRatings]);
    }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Securities', path: '/securities/list' },
          { ...breadcrumb },
        ]}
        title={title}
      />

      <Row>
        <Col sm={12}>
          {!loaded && !creating ? (
            <div className="text-center"><Spinner size="lg" color="primary" /></div>
          ) : (
              <AvForm onSubmit={submitSecurity}>
                <SecurityActionButtons creating={creating} editing={editing} viewing={viewing} securityId={security.id} handleDeleteSecurity={handleDeleteSecurity} isSaving={isSaving} />
                <Card>
                  <CardBody>
                    <h4>Details</h4>

                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="number">Note Number *</Label>
                          {/* <AvInput name="number" id="number" required disabled={viewing} /> */}
                          <AvInput name="number" id="number" value={security.number} required disabled={viewing} />
                          <AvFeedback tooltip>Note Number is required</AvFeedback>
                        </AvGroup>
                      </Col>

                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="noteRate">Note Rate *</Label>
                          <div className="input-group">
                            {/* <AvInput name="noteRate" id="noteRate" required disabled={viewing} /> */}
                            <AvInput name="noteRate" id="noteRate" value={security.noteRate} required disabled={viewing} />
                            <AvFeedback tooltip>Note Rate is required</AvFeedback>
                            <InputGroupAddon addonType="append">%</InputGroupAddon>
                          </div>
                        </AvGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="tradeDate">Trade Date *</Label>
                          <div className="input-group">
                            <DatePicker
                              className="form-control date"
                              dateFormat="MM/dd/yyyy"
                              // value={security.tradeDate}
                              // value={tradeDate}
                              // defaultValue={tradeDate}
                              // defaultDate={security.tradeDate}
                              // openToDate={security.tradeDate}
                              // placeholderText={security.tradeDate}
                              selected={tradeDate}
                              // onSelect={tradeDate}
                              onChange={date => setTradeDate(date)}
                              // placeholderText={security.tradeDate}
                              required disabled={viewing}
                            />
                            {/* <AvInput name="tradeDate" id="tradeDate" value={security.tradeDate} required disabled={viewing} />
                            <AvFeedback tooltip>Trade Date is required</AvFeedback> */}
                          </div>
                        </AvGroup>
                      </Col>
                      {/* (Ryan) attempting to fix maturityDate field */}
                      <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="maturityDate">Maturity Date *</Label>
                          <div className="input-group">
                            <DatePicker
                              className="form-control date"
                              dateFormat="MM/dd/yyyy"
                              // value={security.maturityDate}
                              // value={maturityDate}
                              selected={maturityDate}
                              onChange={date => setMaturityDate(date)}
                              required disabled={viewing}
                            />
                            {/* <AvInput name="maturityDate" id="maturityDate" value={security.maturityDate} required disabled={viewing} /> */}
                            <AvFeedback tooltip>Maturity Date is required</AvFeedback>
                          </div>
                        </AvGroup>
                      </Col>
                      {/* <Col sm={6}>
                        <AvGroup className="position-relative">
                          <Label for="originationDate">Maturity Date *</Label>
                          <div className="input-group">
                            <HyperDatepicker
                              hideAddon={true}
                              dateFormat="MM/dd/yyyy"
                              selected={originationDate}
                              onChange={handleDateChange}
                            />
                          </div>
                        </AvGroup>
                      </Col> */}
                    </Row>

                    <hr />
                    <h4>Ratings</h4>
                    <Table className="ratings-list-table table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th style={{'width': '200px'}}>Agency</th>
                          <th style={{'width': '50px'}}>Rating</th>
                          <th style={{'width': '200px'}}>Date</th>
                          <th style={{'width': '50px'}}>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {securityRatings?.length === 0 && (
                          <tr>
                            <td colSpan="4">No ratings have been added yet. {!editing && (<>Edit this security to add some.</>)}</td>
                          </tr>
                        )}
                        {viewing && security?.ratings?.map((rating, i) => (
                          <tr key={i}>
                            <td>{rating.agency}</td>
                            <td>{rating.rating}</td>
                            <td>{rating.date}</td>
                            <td></td>
                          </tr>
                        ))}
                        {editing && securityRatings?.map((securityRating, i) => (
                          <tr key={i}>
                            <td>
                              <AvGroup className="position-relative mb-0">
                                <AvField
                                  name="ratingAgency"
                                  type="select"
                                  value={securityRating.agency}
                                  className="custom-select"
                                  onChange={(e) => handlesecurityRatingAgencyChange(e, i)}
                                >
                                  {agencyRatings.length > 0 && agencyRatings.map((rating, j) => 
                                    (<option value={rating.agency} key={j}>{rating.agency}</option>)
                                  )}
                                </AvField>
                              </AvGroup>
                            </td>
                            <td>
                              <AvGroup className="position-relative mb-0">
                                <AvField
                                  name="ratingValue"
                                  type="select"
                                  value={securityRating.value}
                                  className="custom-select"
                                  onChange={(e) => handlesecurityRatingValueChange(e, i)}
                                >
                                  {props.agencyRatings && securityRatings.length !== 0 && props.agencyRatings[securityRatings[i].agency].map((val, k) => 
                                    (<option value={val.value} key={k}>{val.value}</option>)
                                  )}
                                </AvField>
                              </AvGroup>
                            </td>
                            <td>
                              <div className="position-relative mb-0">
                                <DatePicker
                                  className="form-control date"
                                  dateFormat="MM/dd/yyyy" 
                                  selected={securityRating.date}
                                  onChange={date => handlesecurityRatingDateChange(date, i)}
                                />
                              </div>
                            </td>
                            <td>
                              <span className="btn btn-danger" onClick={() => handleRemovesecurityRating(i)}>remove</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      {editing && agencyRatings.length !== 0 && (
                      <tfoot>
                        <tr>
                          <td colSpan="4">
                            <span className="btn btn-secondary" onClick={(e) => addNewsecurityRating(e)}>Add New Rating</span>
                          </td>
                        </tr>
                      </tfoot>
                      )}
                    </Table>

                  </CardBody>
                </Card>

                {/* verified to work in KDM-97-update-delete-new-security*/}
                <SecurityActionButtons creating={creating} editing={editing} viewing={viewing} securityId={security.id} handleDeleteSecurity={handleDeleteSecurity} isSaving={isSaving} />
              </AvForm>
            )}
        </Col>
      </Row>

      <ModalProperty
        isOpen={showPropertyModal}
        toggle={toggleShowPropertyModal}
        mode={propertyMode}
        property={property}
        securityId={security?.id}
      />
      <ModalDeleteProperty
        isOpen={showDeletePropertyModal}
        toggle={toggleDeletePropertyModal}
        propertyId={property.id}
        securityId={security?.id}
      />
      <ModalDeleteSecurity
        isOpen={showDeleteSecurityModal}
        toggle={toggleDeleteSecurityModal}
        securityId={security?.id}
      />
    </>
  );
};

const SecurityActionButtons = ({ creating, editing, viewing, securityId, handleDeleteSecurity, isSaving }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      {creating && (
        <>
          <Link to="/securities/list" className="btn btn-secondary mr-2">Cancel</Link>
          <Button type="submit" className="btn btn-primary">
            {isSaving
              ? (<Spinner size="sm" color="primary" />)
              : (<>Save New Security</>)
            }
          </Button>
        </>
      )
      }

      {/* verified to work in KDM-97-update-delete-new-security*/}
      {
        editing && (
          <>
            <Link to={`/securities/${securityId}`} className="btn btn-secondary mr-2">Cancel</Link>
            <Button type="submit" className="btn btn-primary">Save Changes</Button>
          </>
        )
      }

      {
        viewing && (
          <>
            <Button className="btn btn-danger mr-2" onClick={(e) => handleDeleteSecurity(securityId)}>Delete Security</Button>
            <Link to={`/securities/${securityId}/edit`} className="btn btn-primary">Edit Security</Link>
          </>
        )
      }
    </div >
  );
}

const mapStateToProps = state => {
  const security = state.Security;;
  const agencyRatings = state.Rating.ratings?.ratings;
  return { ...security, agencyRatings };
};

export default connect(
  mapStateToProps,
  { getSecurity, createSecurity, editSecurity, deleteSecurity, clearSecurity, getRatings }
)(SecurityDetails);