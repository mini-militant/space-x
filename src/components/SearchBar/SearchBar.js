import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { setSearchedItem } from "../../Redux/Actions";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchQuery: "",
    };
  }

  handleSearchQueryChange = (event) => {
    this.setState({
      SearchQuery: event.target.value,
    });
  };
  render() {
    this.props.setSearchedItem(this.state.SearchQuery);
    return (
      <div>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            value={this.state.SearchQuery}
            className="mr-sm-2"
            onChange={this.handleSearchQueryChange}
          />
          <Button
            variant="outline-success"
            onClick={this.props.getSearchedItem}
          >
            Search
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchedItem: (data) => dispatch(setSearchedItem(data)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
