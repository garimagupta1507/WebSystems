/**
 * This middleware ensure that whenever a location change happen, we get the
 * chance to properly reset the redux-form record form, preventing data to be
 * kept between different resources or form types (CREATE, EDIT).
 *
 * A middleware is needed instead of a saga because we need to control the actions
 * order: we need to ensure we reset the redux form BEFORE the location actually
 * changes. Otherwise, the new page which may contain a record redux-form might
 * initialize before our reset and loose its data.
 */
declare const formMiddleware: () => (next: any) => (action: any) => any;
export default formMiddleware;
