import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

const usePrompt = (
	when = 'Boolean',
	message = 'You did not checked the "Remember me" checkbox, so you will be logged out.'
) => {
	const navigate = useNavigate();

	const self = useRef(null);

	useEffect(() => {
		const onWindowOrTabClose = (event) => {
			if (!when) {
				return;
			}

			if (typeof event == 'undefined') {
				event = window.event;
			}

			if (event) {
				event.returnValue = message;
			}

			return message;
		};

		if (when) {
			self.current = navigate();
		} else {
			self.current = null;
		}

		window.addEventListener('beforeunload', onWindowOrTabClose);

		return () => {
			if (self.current) {
				self.current();
				self.current = null;
			}

			window.removeEventListener('beforeunload', onWindowOrTabClose);
		};
	}, [navigate, message, when]);
};

export default usePrompt;
