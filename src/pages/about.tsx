import React from 'react';
import { useMsal } from '@azure/msal-react';

import { loginRequest } from '../config/authConfig';
import { IUserDetailsProps } from '@interface/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { ENDPOINTS } from '@constants/endpoints';

const About = () => {
  const { instance, accounts } = useMsal();
  const [userDetails, setUserDetails] = React.useState<Partial<IUserDetailsProps>>();

  React.useEffect(() => {
    if (accounts.length > 0) {
      getProfile();
    }
  }, [accounts]);

  const getProfile = async () => {
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    });

    const graphResponse = await fetch(ENDPOINTS.USER_DETAILS, {
      headers: {
        Authorization: `Bearer ${response.accessToken}`,
      },
    });

    const user: Partial<IUserDetailsProps> = await graphResponse.json();
    setUserDetails(user);
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center p-6">
      <Card>
        <CardHeader className="flex items-center gap-4 border-b pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold">
            {userDetails?.displayName?.[0] || 'U'}
          </div>
          <div>
            <CardTitle className="text-2xl text-gray-800">
              {userDetails?.displayName || 'Unknown User'}
            </CardTitle>
            <CardDescription>{userDetails?.userPrincipalName || '—'}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Email:</span>
            <span className="font-medium">{userDetails?.mail || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phone:</span>
            <span className="font-medium">{userDetails?.mobilePhone || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Business Phone:</span>
            <span className="font-medium">{userDetails?.businessPhones?.[0] || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Job Title:</span>
            <span className="font-medium">{userDetails?.jobTitle || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Office:</span>
            <span className="font-medium">{userDetails?.officeLocation || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Language:</span>
            <span className="font-medium">{userDetails?.preferredLanguage || '—'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
