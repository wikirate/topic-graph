class window.TopicGraph
  constructor: (metricData, topicData, @container) ->
    @topic_ids = {}
    @topic_connections = {}
    @nodes = []
    @edges = []

    @topic_count = 0
    @topic_connection_count = 0

    @options = {
      font_size: 20
      edges_weighted: false,
      edge_threshold: 10 # Number of metrics tagged with a topic needed to establish a node
      node_threshold: 15 # Number of connecting metrics between topics needed to establish an edge
      colorful: false
    }

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
    @topic_count = @topics.length
    for item in @topics
      @topic_ids[item.name] = item.id

    self = this
    for item in metricData.items
      if item.topics.length > 1
        ids = item.topics.map (topic) -> self.topic_ids[topic]
          .sort()
        topic_weight = 1/item.topics.length
        for id1, i in ids
          for id2 in ids[i+1..]
            @topic_connections[id1] ?= {}
            @topic_connections[id1][id2] ?= { count: 0, score: 0}
            if @topic_connections[id1][id2].count == 0
              @topic_connection_count += 1
            @topic_connections[id1][id2].count += 1
            @topic_connections[id1][id2].score += topic_weight

  showEdge: (topic_connection) ->
    if @options.edges_weighted
      topic_connection.score >= @options.edge_threshold
    else
      topic_connection.count >= @options.edge_threshold

  showNode: (topic) ->
    topic.metrics >= @options.node_threshold

  updateEdges: () ->
    @edges = []
    debugger
    for id1, other_ids of @topic_connections
      for id2, value of other_ids
        if @showEdge(@topic_connections[id1][id2])
          @edges.push {
            from: id1
            to: id2
            value: value
          }

  updateNodes: () ->
    @nodes = []
    for topic in @topics
      if @showNode(topic)
        group_id = if @options.colorful then topic.id else 1
        @nodes.push {
          id: topic.id,
          label: topic.name,
          value: topic.metrics
          group: group_id
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