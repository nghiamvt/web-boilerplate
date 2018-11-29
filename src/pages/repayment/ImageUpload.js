import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ErrMsg, Thumbnail } from '@/components/Form';
import DefaultImage from '@/assets/images/default-image.svg';

class ImageUpload extends Component {
  static displayName = 'ImageUpload';

  static propTypes = {
    form: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  renderComponent = (props, state) => {
    const { values, setFieldValue, setFieldTouched } = props.form;
    return (
      <div className="ImageUpload">
        <div className="BlockLeft">
          <div className="GroupTitle">Upload Receipt</div>
          <div className="GroupNote">Upload a photo as proof of repayment (gif/jpeg/jpg/png)</div>
        </div>
        <div className="BlockRight">
          <input
            name="image"
            type="file"
            className={cx('FileInput', { Loaded: state.loaded })}
            onChange={e => {
              setFieldValue('image', e.currentTarget.files[0]);
            }}
            onBlur={() => setFieldTouched('image')}
          />
          <Thumbnail file={values.image} defaultImage={DefaultImage} />
        </div>
        <ErrMsg name="image" />
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default ImageUpload;
