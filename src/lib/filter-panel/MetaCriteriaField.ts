export default interface MetaCriteriaField {

    type: string;

    attrs: any;

    label: string;

    size: '' | 'x15' | 'x20' | 'x25' | 'x30' | 'x35' | 'x40';

    isAdvanced?: boolean;

    component?: any;

}