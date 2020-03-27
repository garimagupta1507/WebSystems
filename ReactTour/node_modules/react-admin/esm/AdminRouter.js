import { CoreAdminRouter } from 'ra-core';
import { Loading } from 'ra-ui-materialui';
var AdminRouter = CoreAdminRouter;
AdminRouter.defaultProps = {
    loading: Loading,
};
export default AdminRouter;
