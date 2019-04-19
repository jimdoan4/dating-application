import React, { Component } from 'react';
import MalePage from './MalePage';
import MeventPage from './MeventPage';
import McommentPage from './McommentPage';

export default class MaleShowPage extends Component {
	state = {
		maleId: this.props.match.params.maleId
	};

	render() {
		return (
			<div className="container" style={{ marginTop: '10px' }}>
				<div className="row">
					<div
						style={{
							marginLeft: '70px',
							color: 'black'
						}}
						className="row-sm-5 row-md-6 text-center"
					>
						<MalePage maleId={this.state.maleId} />
					</div>
					<div style={{ marginLeft: '60px', marginTop: '30px' }} className=".col-md-4">
						<MeventPage maleId={this.state.maleId} />

						<div style={{ marginTop: '30px', marginBottom: '160px' }} className=".col-md-4">
							<McommentPage maleId={this.state.maleId} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
