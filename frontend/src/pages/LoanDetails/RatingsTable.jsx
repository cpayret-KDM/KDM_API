import React, { useState, useEffect } from 'react';
import { AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import UncontrolledAlert from 'reactstrap/lib/UncontrolledAlert';
import { DATE_FORMAT } from '../../constants/utils';
import { getRatings } from '../../redux/actions';

const RatingsTable = (props) => {
  const {  
    itemType = 'loan', 
    editing = false,
    viewing = false,
  } = props;

  /* Get list of Agency Ratings onPageLoad*/
  useEffect(() => {
    props.getRatings();
  }, []);

  /* Set Agency Ratings onPageLoad */
  const [agencyRatings, setAgencyRatings] = useState([]);
  useEffect(() => {
    if (props.agencyRatings) {
      let formattedAgencyRatings = [];
      Object.entries(props.agencyRatings).forEach((rating) => {
        formattedAgencyRatings.push({
          agency: rating[0],
          values: rating[1]
        });
      });
      setAgencyRatings(formattedAgencyRatings);
    }
  }, [props.agencyRatings]);

  /* Set Item Ratings onPageLoad */
  const [itemRatings, setItemRatings] = useState([]);
  useEffect(() => {
    if (props.item.ratings) {
      const formattedRatings = [];
      props.item.ratings.forEach(rating => {
        formattedRatings.push({
          agency: rating.agency,
          rating: rating.rating,
          ratingId: rating.ratingId,
          value: rating.ratingId,
          date: moment(rating.date).toDate(),
          note: rating.note,
        });
      });
      setItemRatings(formattedRatings);
    }
  }, [props.item]);

  /* State Functions */
  const [showDuplicateAgencyWarning, setShowDuplicateAgencyWarning] = useState(null);
  const addNewItemRating = () => {
    const newItemRatings = [...itemRatings];
    newItemRatings.push({
      agency: agencyRatings[0].agency,
      value: agencyRatings[0].values[0].id,
      date: '',
      note: '',
    });
    setItemRatings([...newItemRatings]);
  }
  const handleItemRatingAgencyChange = (e, i) => {
    const newAgency = e.target.value;

    // Show warning message if duplicate Agencies are selected
    if (itemRatings.some(ir => ir.agency === newAgency)) {
      setShowDuplicateAgencyWarning(newAgency);
    } else {
      setShowDuplicateAgencyWarning(null);
    }

    const newItemRatings = [...itemRatings];
    newItemRatings[i].agency = newAgency;
    agencyRatings.forEach((rating) => {
      if (rating.agency === newAgency) {
        newItemRatings[i].value = rating.values[0].value;
      }
    });
    setItemRatings([...newItemRatings]);
  }
  const handleItemRatingValueChange = (e, i) => {
    const newItemRatings = [...itemRatings];
    newItemRatings[i].value = Number(e.target.value);
    setItemRatings([...newItemRatings]);
  }
  const handleItemRatingNoteChange = (e, i) => {
    const newItemRatings = [...itemRatings];
    newItemRatings[i].note = e.target.value;
    setItemRatings([...newItemRatings]);
  }
  const handleItemRatingDateChange = (date, i) => {
    const newItemRatings = [...itemRatings];
    newItemRatings[i].date = date;
    setItemRatings([...newItemRatings]);
  }
  useEffect(() => {
    props.update(itemRatings, showDuplicateAgencyWarning);
  }, [itemRatings]);

  const isLoaded = itemRatings.length > 0 && agencyRatings.length > 0;
  return (
    <>
      {showDuplicateAgencyWarning && (
        <UncontrolledAlert color="danger">
          Cannot select {showDuplicateAgencyWarning} twice, please choose another Agency.
        </UncontrolledAlert>
      )}
      {itemRatings?.length === 0 ? (
        <p>No ratings have been added yet. {!editing && (<>Edit this {itemType} to add some.</>)}</p>
      ) : (
        <Table className="ratings-list-table table-centered table-nowrap mb-0">
          <thead>
            <tr>
              <th style={{'width': '100px'}}>Agency</th>
              <th style={{'width': '100px'}}>Rating</th>
              <th style={{'width': '100px'}}>Date</th>
              <th style={{'width': '200px'}}>Note</th>
            </tr>
          </thead>
          <tbody>
            {viewing && isLoaded && itemRatings?.map((itemRating, i) => (
              <tr key={i}>
                <td>{itemRating.agency}</td>
                <td>{itemRating.rating}</td>
                <td>{moment(itemRating.date).format(DATE_FORMAT)}</td>
                <td>{itemRating.note}</td>
              </tr>
            ))}
            {editing && isLoaded && itemRatings?.map((itemRating, i) => (
              <tr key={i}>
                <td>
                  <AvGroup className="position-relative mb-0">
                    <AvField
                      name="ratingAgency"
                      type="select"
                      value={itemRating.agency}
                      className="custom-select"
                      onChange={(e) => handleItemRatingAgencyChange(e, i)}
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
                      value={itemRating.ratingId}
                      className="custom-select"
                      onChange={(e) => handleItemRatingValueChange(e, i)}
                    >
                      {itemRatings.length !== 0 && agencyRatings.find(ar => ar.agency === itemRatings[i].agency)?.values.map((val, k) =>
                        (<option value={val.id} key={k}>{val.value}</option>)
                      )}
                    </AvField>
                  </AvGroup>
                </td>
                <td>
                  <div className="position-relative mb-0">
                    <DatePicker
                      className="form-control date"
                      dateFormat="MM/dd/yyyy" 
                      selected={itemRating.date}
                      onChange={date => handleItemRatingDateChange(date, i)}
                    />
                  </div>
                </td>
                <td>
                  <AvGroup className="position-relative">
                    <AvInput name="ratingNote" id="ratingNote" value={itemRating.note} onChange={e => handleItemRatingNoteChange(e, i)} />
                  </AvGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {editing && agencyRatings.length !== 0 && agencyRatings.length !== itemRatings.length && (
        <span className="btn btn-secondary" onClick={(e) => addNewItemRating(e)}>Add New Rating</span>
      )}
    </>
  );
}


const mapStateToProps = state => {
  const agencyRatings = state.Rating.ratings?.ratings;
  return { agencyRatings };
};

export default connect(
  mapStateToProps,
  { getRatings }
)(RatingsTable);