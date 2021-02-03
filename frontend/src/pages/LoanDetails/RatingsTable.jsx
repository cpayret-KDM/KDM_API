import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Table } from 'reactstrap';
import { AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

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
      Object.entries(props.agencyRatings).forEach((rating, i) => {
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
  // useEffect(() => {
  //   if (props.item.ratings) {
  //     const formattedRatings = [];
  //     props.item.ratings.forEach(rating => {
  //       formattedRatings.push({
  //         agency: rating.agency,
  //         value: rating.ratingId,
  //         date: moment(rating.date).toDate(),
  //         note: rating.note,
  //       });
  //     });
  //     setItemRatings(formattedRatings);
  //   }
  // }, [props.item]);
  useEffect(() => {
    if (props.item.ratings && agencyRatings.length > 0) {
      console.log('item ratings',props.item.ratings)
      console.log('agencyRatings',agencyRatings)
      const formattedRatings = [];
      props.item.ratings.forEach(rating => {
        let ratingValue = null;
        agencyRatings.forEach(agencyRating => {
          if (agencyRating.agency === rating.agency) {
            agencyRating.values.forEach(val => {
              if (val.value === rating.rating) {
                ratingValue = val.id;
                return;
              }
            });
          }
        });


        formattedRatings.push({
          agency: rating.agency,
          value: ratingValue,
          date: moment(rating.date).toDate(),
          note: rating.note,
        });
      });
      setItemRatings(formattedRatings);
    }
  }, [props.item, agencyRatings]);
  useEffect(() => {
    //console.log('item ratings changed', itemRatings)
  }, [itemRatings])


  /* State Functions */
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
    const newItemRatings = [...itemRatings];
    newItemRatings[i].agency = e.target.value;
    agencyRatings.forEach((rating, k) => {
      if (rating.agency === e.target.value) {
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
  const handleRemoveItemRating = (i) => {
    const newItemRatings = [...itemRatings];
    newItemRatings.splice(i, 1);
    setItemRatings([...newItemRatings]);
  }
  useEffect(() => {
    props.update(itemRatings);
  }, [itemRatings]);

  return (
    <>
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
              <th style={{'width': '50px'}}>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {viewing && itemRatings?.map((rating, i) => (
              <tr key={i}>
                <td>{rating.agency}</td>
                <td>{rating.rating}</td>
                <td>{rating.date}</td>
                <td>{rating.note}</td>
                <td></td>
              </tr>
            ))}
            {editing && itemRatings?.map((itemRating, i) => (
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
                      value={itemRating.value}
                      className="custom-select"
                      onChange={(e) => handleItemRatingValueChange(e, i)}
                    >
                      {itemRatings.length !== 0 && props.agencyRatings[itemRatings[i].agency].map((val, k) =>
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
                <td>
                  <span className="btn btn-danger" onClick={() => handleRemoveItemRating(i)}>remove</span>
                </td>
              </tr>
            ))}
          </tbody>
          {editing && agencyRatings.length !== 0 && (
          <tfoot>
            {/* <tr>
              <td colSpan="4">
                <span className="btn btn-secondary" onClick={(e) => addNewItemRating(e)}>Add New Rating</span>
              </td>
            </tr> */}
          </tfoot>
          )}
        </Table>
      )}
      {editing && (<span className="btn btn-secondary" onClick={(e) => addNewItemRating(e)}>Add New Rating</span>)}
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