EdgeFormula =
  simple: 1
  topic_count : 2
  bookmarks: 3

NodeFormula =
  metrics: 1
  bookmarks: 2

class window.TopicGraph
  constructor: (metricData, topicData, @container) ->
    @topic_ids = {}
    @topic_connections = {}
    @nodes = null
    @selected_node = null
    @edges = null
    @data = {}
    @network = null
    @topic_count = 0
    @topic_connection_count = 0

    @options = {
      font_size: 20
      node_size: 1
      edge_size: 1
      edge_formula: EdgeFormula.topic_count
      node_formula: NodeFormula.metrics
      edge_threshold: 2 # Number of metrics tagged with a topic needed to establish a node
      node_threshold: 2 # Number of connecting metrics between topics needed to establish an edge
      colorful: false
    }

    @vis_config =
      nodes:
        shape: 'dot'
        font:
          size: @options.font_size
        scaling:
          min: 10
          max: 70
          label:
            enabled: false
            min: 10
            max: 50
      edges:
        scaling:
          min: 1
          max: 20
          label:
            enabled: true
            min: 20
            max: 50
      interaction:
        hover: true
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
        topic_count_score = 1/(item.topics.length - 1)
        bookmark_score = item.bookmarkers
        for id1, i in ids
          for id2 in ids[i+1..]
            @topic_connections[id1] ?= {}
            @topic_connections[id1][id2] ?= { count: 0, topic_count_score: 0, bookmark_score: 0 }
            if @topic_connections[id1][id2].count == 0
              @topic_connection_count += 1
            @topic_connections[id1][id2].count += 1
            @topic_connections[id1][id2].topic_count_score += topic_count_score
            @topic_connections[id1][id2].bookmark_score += bookmark_score

  showEdge: (topic_connection) ->
    if @options.edge_formula == EdgeFormula.simple
      topic_connection.count >= @options.edge_threshold
    else if @options.edge_formula == EdgeFormula.topic_count
      topic_connection.topic_count_score >= @options.edge_threshold
    else
      debugger
      topic_connection.bookmark_score >= @options.edge_threshold

  showNode: (topic) ->
    if @options.node_formula == NodeFormula.bookmarks
      topic.bookmarkers >= @options.node_threshold
    else
      topic.metrics >= @options.node_threshold

  setFontSize: (size) ->
    @options.font_size = size
    @vis_config.nodes ?= {}
    @vis_config.nodes.font ?= {}
    @vis_config.nodes.font.size = size

  updateEdges: () ->
    @edges = new vis.DataSet([])
    for id1, other_ids of @topic_connections
      for id2, connection of other_ids
        if @showEdge(@topic_connections[id1][id2])
          @edges.add {
            from: parseInt(id1)
            to: parseInt(id2)
            value: connection.count * @options.edge_size
          }

  updateNodes: () ->
    @nodes = new vis.DataSet([])
    for topic in @topics
      if @showNode(topic)
        group_id = switch
          when @options.colorful then topic.id
          when topic.name.indexOf("GRI") == 0 then 2
          when topic.name.indexOf("SDG") == 0 then 3
          when topic.name.indexOf("G4") == 0 then 4
          else 1
        value = if @options.node_formula_bookmark then topic.bookmarkers else topic.metrics
        @nodes.add {
          id: topic.id,
          label: topic.name,
          label_bak: topic.name
          value: value * @options.node_size
          group: group_id
        }

  loadConfig: (options) ->
      @options = options
      @setFontSize(options.font_size)

  getVisConfig: () ->
    jsyaml.safeDump(@vis_config)

  setVisConfig: (yaml) ->
    debugger
    @vis_config = jsyaml.safeLoad(yaml)
    @network.setOptions(@vis_config)

  render: () ->
    @data = {
      nodes: @nodes
      edges: @edges
    }

    @network = new vis.Network(@container, @data, @vis_config)
    self = this
    @network.on "hoverNode", (params) ->
      node = self.nodes.get(params.node)
      node.label = node.label_bak
      self.nodes.update(
        node
      )

    @network.on "click", (params) ->
      if params.nodes.length < 1 or @selected_node == params.nodes[0]
        @selected_node = null
        self.nodes.update(
          self.nodes.get(
            fields: ["id", "label_bak"]
          ).map((node) ->
            id: node.id
            label: node.label_bak
          )
        )
        self.edges.update(
          self.edges.getIds().map((id) ->
            { id: id, hidden: false }
          )
        )
        return

      @selected_node = params.nodes[0]
      neighbours = params.nodes
      self.edges.get(
        filter: (item) ->
          item.id in params.edges
      ).forEach (edge) ->
        neighbours.push edge.from
        neighbours.push edge.to

      self.nodes.update(
        self.nodes.get(
          fields: ["id", "label_bak"]
        ).map((node) ->
          id: node.id
          label: if node.id in neighbours then node.label_bak else ""
        )
      )
      self.edges.update(
        self.edges.getIds().map((id) ->
          { id: id, hidden: id not in params.edges }
        )
      )