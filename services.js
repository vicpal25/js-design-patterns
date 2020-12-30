const esconfig = require('./esConfig');
const client = esconfig.esClient;
const config = require('./config');
const index = config.es_index;
const esb = require('elastic-builder'); //the builder

module.exports = {

  async search() {
    const requestBody = esb.requestBodySearch()
      .query(esb.matchAllQuery())
      .size(10)
      .from(1);
    return client.search({ body: requestBody.toJSON() });
  },

  async filterCarsByYearMade(param) {
    const requestBody = esb.requestBodySearch()
      .query(
        esb.boolQuery()
          .must(esb.matchAllQuery())
          .filter(esb.rangeQuery('year').gte(param).lte(param))

      )
      .from(1)
      .size(5);
    return client.search({ index: index, body: requestBody.toJSON() });
  },


  async filterCarsByName(param) {
    const requestBody = esb.requestBodySearch()
      .query(
        esb.termQuery('name', param))
      .sort(esb.sort('year', 'asc')
      )
      .from(1)
      .size(10);
    return client.search({ index: index, body: requestBody.toJSON() });

  },

  async fetchCarByName(param) {
    const requestBody = esb.requestBodySearch()
      .query(
        esb.boolQuery()
          .must(esb.matchPhraseQuery('name', param))
      );
    return client.search({ index: index, body: requestBody.toJSON() });
  },

  async fetchMatchMultipleQuery(origin, name, weight) {
    const requestBody = esb.requestBodySearch()
      .query(
        esb.boolQuery()
          .must([
            esb.matchQuery(
              'origin', origin,
            ),
            (
              esb.matchQuery(
                'name', name,
              )
            ),
          ])
          .filter(esb.rangeQuery('weight_in_lbs').gte(weight))
      )
    return client.search({ index: index, body: requestBody.toJSON() });
  },

  async aggregateQuery(origin, cylinder, name, horsePower) {
    const requestBody = esb.requestBodySearch()
      .query(
        esb.boolQuery()
          .must(esb.matchQuery('origin', origin))
          .filter(esb.rangeQuery('cylinders').gte(cylinder))
          .should(esb.termQuery('name', name))
          .mustNot(esb.rangeQuery('horsepower').gte(horsePower))
        // .agg(esb.avgAggregation('avg_miles', 'Miles_per_Gallon'))
      )
    return client.search({ index: index, body: requestBody.toJSON() });
  },

};
