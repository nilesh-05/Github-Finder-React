import React, { Fragment, useEffect } from 'react'
import Spinner from '../layouts/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'

const User = ({ user, loading, repos, getUser, getUserRepos, match }) => {
	useEffect(() => {
		getUser(match.params.login)
		getUserRepos(match.params.login)
		// eslint-disable-next-line
	}, [])

	const { name, avatar_url, company, location, bio, blog, login, html_url, followers, following, public_repos, hireable } = user

	if (loading) return <Spinner />

	return (
		<Fragment>
			<Link to='/' className='btn btn-light'>Back to search</Link>
				Hireable : {' '}
			{hireable ?
				<i className='fa fa-check text-success' /> : <i className='fa fa-times-circle text-danger' />}
			<div className="card grid-2">
				<div className="all-center">
					<img src={avatar_url} className='round-img' style={{ width: '150px' }} alt="" />
					<h1>{name}</h1>
					<p>Based in : {location}</p>
				</div>
				<div>
					{bio && (<Fragment>
						<h3>Bio : </h3>
						<p>{bio}</p>
					</Fragment>
					)}
					<a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
					<ul>
						<li>
							{login && (<Fragment>
								<strong>Username : </strong>{login}
							</Fragment>)}
						</li>
						<li>
							{company && (<Fragment>
								<strong>Company : </strong>{company}
							</Fragment>)}
						</li>
						<li>
							{blog && (<Fragment>
								<strong>Website : </strong>{blog}
							</Fragment>)}
						</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary">Followers : {followers}</div>
				<div className="badge badge-success">Following : {following}</div>
				<div className="badge badge-light">Public Repos : {public_repos}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	)
}

User.propTypes = {
	loading: PropTypes.bool,
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
	getUserRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
}

export default User