import React from 'react'
import { combineValidators, isRequired } from 'revalidate';
import { IProfileFormValues } from '../../app/models/profile';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import { Form, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IProfile } from '../../app/models/profile'

const validate = combineValidators({
	displayName: isRequired('Display name')
})

interface IProps {
	handleEditProfile: (value: IProfileFormValues) => void;
	profile: IProfile;
	submitting: boolean;
}

const ProfileEditForm: React.FC<IProps> = ({
	handleEditProfile,
	profile,
	submitting
}) => {
	return (
		<FinalForm
			validate={validate}
			initialValues={profile!}
			onSubmit={handleEditProfile}
			render={({ handleSubmit, invalid, pristine }) => (
				<Form onSubmit={handleSubmit}>
					<Field
						name='displayName'
						placeholder='Display Name'
						value={profile!.displayName}
						component={TextInput}
					/>
					<Field
						name='bio'
						placeholder='Biography'
						value={profile!.bio}
						rows={3}
						component={TextAreaInput}
					/>
					<Button
						loading={submitting}
						floated='right'
						disabled={invalid || pristine}
						positive
						content='Update profile'
					/>
				</Form>
			)}
		/>
	)
}

export default observer(ProfileEditForm)
