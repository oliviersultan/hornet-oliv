package prometheus

import (
	"github.com/prometheus/client_golang/prometheus"
)

var (
	appInfo    *prometheus.GaugeVec
	health     prometheus.Gauge
	milestones *prometheus.GaugeVec
	tips       *prometheus.GaugeVec
	requests   *prometheus.GaugeVec
)

func configureNode() {

	appInfo = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Namespace: "iota",
			Subsystem: "node",
			Name:      "app_info",
			Help:      "Node software name and version.",
		},
		[]string{"name", "version"},
	)

	health = prometheus.NewGauge(
		prometheus.GaugeOpts{
			Namespace: "iota",
			Subsystem: "node",
			Name:      "health",
			Help:      "Health of the node.",
		})

	milestones = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Namespace: "iota",
			Subsystem: "node",
			Name:      "milestones",
			Help:      "Infos about milestone indexes.",
		},
		[]string{"type"},
	)

	tips = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Namespace: "iota",
			Subsystem: "node",
			Name:      "tip_count",
			Help:      "Number of tips.",
		}, []string{"type"},
	)

	requests = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Namespace: "iota",
			Subsystem: "node",
			Name:      "request_count",
			Help:      "Number of messages to request.",
		}, []string{"type"},
	)

	appInfo.WithLabelValues(deps.AppInfo.Name, deps.AppInfo.Version).Set(1)

	registry.MustRegister(appInfo)
	registry.MustRegister(health)
	registry.MustRegister(milestones)
	registry.MustRegister(tips)
	registry.MustRegister(requests)

	addCollect(collectInfo)
}

func collectInfo() {
	health.Set(0)
	if deps.Tangle.IsNodeHealthy() {
		health.Set(1)
	}

	milestones.WithLabelValues("latest").Set(float64(deps.Storage.GetLatestMilestoneIndex()))
	milestones.WithLabelValues("confirmed").Set(float64(deps.Storage.GetConfirmedMilestoneIndex()))

	snapshotInfo := deps.Storage.GetSnapshotInfo()
	milestones.WithLabelValues("snapshot").Set(0)
	milestones.WithLabelValues("pruning").Set(0)
	if snapshotInfo != nil {
		milestones.WithLabelValues("snapshot").Set(float64(snapshotInfo.SnapshotIndex))
		milestones.WithLabelValues("pruning").Set(float64(snapshotInfo.PruningIndex))
	}

	nonLazyTipCount, semiLazyTipCount := deps.TipSelector.GetTipCount()
	tips.WithLabelValues("nonlazy").Set(float64(nonLazyTipCount))
	tips.WithLabelValues("semilazy").Set(float64(semiLazyTipCount))

	queued, pending, processing := deps.RequestQueue.Size()
	requests.WithLabelValues("queued").Set(float64(queued))
	requests.WithLabelValues("pending").Set(float64(pending))
	requests.WithLabelValues("processing").Set(float64(processing))
}