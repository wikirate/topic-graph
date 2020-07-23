LINK_TARGET_HOST = "https://wikirate.org"

class window.TopicGraph
  constructor: (metricData, topicData, @container) ->
    @topic_ids = {}
    @topic_connections = {}
    @nodes = []
    @edges = []
    @font_size = 20

    @example_topic = {
      "id": 45466,
      "name": "Accident",
      "type": "Topic",
      "url": "https://wikirate.org/Accident.json",
      "content": "",
      "bookmarkers": 0,
      "metrics": 6,
      "projects": 0
    }
    @example_metric = {
      "id": 538693,
      "name": "2020WoB+Women on Board",
      "type": "Metric",
      "url": "https://wikirate.org/2020WoB+Women_on_Board.json",
      "designer": "2020WoB",
      "title": "Women on Board",
      "question": "What percentage of people on the company's board of directors are women?",
      "metric_type": "Researched",
      "about": "<p><span>2020 Women on Boards conducts research studies about the gender composition of the boards of directors of US companies.</span></p>",
      "methodology": "<p>To search for a company listed on the 2020 Women on Boards directory, check the database here: <a href=\"https://www.2020wob.com/company-directory\">https://www.2020wob.com/company-directory</a>. See also data in the 2014 report <a href=\"http://www.2020wob.com/sites/default/files/2020GDI-2014Report.pdf\">here</a>.</p>",
      "value_type": "Number",
      "value_options": [
        "Unknown"
      ],
      "report_type": "Data Breach Report",
      "research_policy": "Designer Assessed",
      "unit": "%",
      "range": null,
      "hybrid": "no",
      "topics": [
        "Employee",
        "Gender equality"
      ],
      "scores": [
        "2020WoB+Women on Board+Mariana",
        "2020WoB+Women on Board+Alex H",
        "2020WoB+Women on Board+Elizabeth Potter"
      ],
      "answers": 3571,
      "bookmarkers": 6,
      "projects": 4,
      "answers_url": "https://wikirate.org/2020WoB+Women_on_Board+Answer.json"
    }

    @topics = topicData.items

    for item in @topics
      @topic_ids[item.name] = item.id

    self = this
    for item in metricData.items
        if item.topics.length > 1
          ids = item.topics.map (topic) -> self.topic_ids[topic]
            .sort()
          for id1, i in ids
            for id2 in ids[i+1..]
              @topic_connections[id1] ?= {}
              @topic_connections[id1][id2] ?= 0
              @topic_connections[id1][id2] += 1

  setEdges: (edge_threshold = EDGE_THRESHOLD) ->
    @edges = []
    for id1, other_ids of @topic_connections
      for id2, value of other_ids
        if @topic_connections[id1][id2] > edge_threshold
          @edges.push {
            from: id1
            to: id2
            value: value
          }

  setNodes: (node_threshold = NODE_THRESHOLD) ->
    @nodes = []
    for topic in @topics
      if topic.metrics >= node_threshold
        @nodes.push {
          id: topic.id,
          label: topic.name,
          value: topic.metrics
        }

  render: () ->
    data =
      nodes: @nodes
      edges: @edges
    options =
      nodes:
        shape: 'dot'
        size: 32
        font:
          size: @font_size
      physics:
        forceAtlas2Based:
          gravitationalConstant: -26
          centralGravity: 0.005
          springLength: 230
          springConstant: 0.18
        maxVelocity: 146
        solver: 'forceAtlas2Based'
        timestep: 0.35
        stabilization: iterations: 150
    new vis.Network(@container, data, options)