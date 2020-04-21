import React, { useContext, useState } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { Tab, Grid, Header, Button } from 'semantic-ui-react';
import ProfileEditForm from './ProfileEditForm';
import { IProfileFormValues } from '../../app/models/profile';

const ProfileDescription = () => {
	const rootStore = useContext(RootStoreContext);
	const {isCurrentUser, profile, editProfile} = rootStore.profileStore;
	const [editMode, setEditMode] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const handleEditProfile = async (values: IProfileFormValues) => {
		setSubmitting(true);
		editProfile(values).then(() => setSubmitting(false)).finally(() => {
			setEditMode(false)
		})
	}

	return (
		<Tab.Pane>
		<Grid>
			<Grid.Column width={16} style={{paddingBottom: 0}}>
				<Header floated='left' icon='user' content={`About ${profile!.displayName}`} />
				{isCurrentUser && (
					<Button
						floated='right'
						basic
						content={editMode ? 'Cancel' : 'Edit Profile'}
						onClick={() => setEditMode(!editMode)}
					/>
				)}
			</Grid.Column>
			<Grid.Column width={16}>
				{editMode ? (
					<ProfileEditForm
						handleEditProfile={handleEditProfile}
						profile={profile!}
						submitting={submitting}
					/>
				) : (
					<span>{profile!.bio}</span>
				)}
			</Grid.Column>
		</Grid>
	</Tab.Pane>
	)
}

export default ProfileDescription
