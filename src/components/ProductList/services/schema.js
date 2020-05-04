/* eslint-disable import/prefer-default-export */

import { gql } from 'apollo-boost';


/**
 * generate dynamic filter query
 * @param catId number
 * @param filter array of filter value
 * @returns string query to generate on grapql tag
 */
const filterProduct = (filter) => {
    let queryFilter = '{ ';
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < filter.length; index++) {
        const detailFilter = filter[index];
        if (detailFilter.type === 'price') {
            queryFilter += `
          ,${detailFilter.type} : {
            from: "${detailFilter.from}"
            to: "${detailFilter.to}"
          }
        `;
        } else if (typeof detailFilter.value === 'object') {
            let inFilter = '';
            // eslint-disable-next-line no-plusplus
            for (let idx = 0; idx < detailFilter.value.length; idx++) {
                inFilter += `${idx !== 0 ? ',' : ''}"${detailFilter.value[idx]}"`;
            }
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type} : {
                in: [${inFilter}]
              }`;
        } else {
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type} : {
                  eq: "${detailFilter.value}"
                }`;
        }
    }
    queryFilter += '}';
    return queryFilter;
};

/**
 * scema dynamic product
 * @param catId number
 * @param config Object {pageSize: number, currentPage: Number}
 * @returns grapql query
 */

export const getProduct = (config = {}) => gql`
    {
      products( search: "${config.search}" ,filter: ${filterProduct(config.filter)}, pageSize: ${
    config.pageSize ? config.pageSize : 20
},
      currentPage: ${config.currentPage ? config.currentPage : 1}
      ${
    config.sort
        ? `, sort: {${config.sort.key} : ${config.sort.value}}`
        : ''
}
      ) {
        total_count
        ${!config.customFilter
        ? `aggregations {
          attribute_code
          label
          options {
            count
            label
            value
          }
        }` : ''}
        __typename
        items {
          id
          name
          url_key
          small_image {
            url
            label
          }
          __typename
          price_tiers {
            discount {
              percent_off
              amount_off
            }
            final_price {
              currency
              value
            }
            quantity
          }
          price_range {
            maximum_price {
              discount{
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
            minimum_price {
              discount{
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
          }
          ... on ConfigurableProduct {
            configurable_options {
              id
              attribute_id
              label
              attribute_code
              values {
                value_index
                label
              }
              product_id
            }
            variants {
              attributes {
                code
                label
                value_index
              }
              product {
                id
                stock_status
                price_tiers {
                  discount {
                    percent_off
                    amount_off
                  }
                  final_price {
                    currency
                    value
                  }
                  quantity
                }
                price_range {
                  maximum_price {
                    discount {
                      amount_off
                      percent_off
                    }
                    final_price {
                      currency
                      value
                    }
                    regular_price {
                      currency
                      value
                    }
                  }
                  minimum_price {
                    discount {
                      amount_off
                      percent_off
                    }
                    final_price {
                      currency
                      value
                    }
                    regular_price {
                      currency
                      value
                    }
                  }
                }
                small_image{
                  url
                  label
                }
                image {
                  url
                  label
                }
              }
            }
          }
        }
      }
    }
  `;
